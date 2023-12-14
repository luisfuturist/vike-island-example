import { ComponentProps, ComponentType } from "react";
import { IslandData, ReactFactory, StrategyContext } from "./types";
import { hydrateRoot } from "react-dom/client";

export function getIslands(container: Element | Document) {
  const islands = container.querySelectorAll("[data-island]");
  return Array.from(islands);
}

export function getData<T extends object = {}>(
  dataScript: Element | null
): IslandData<T> {
  return dataScript ? JSON.parse(dataScript.innerHTML) : {};
}

export function getComponentName(
  component: ComponentType<ComponentProps<any>>
): string {
  const compName = component.displayName || component.name;
  if (!compName) throw new Error("No name provided for component");
  return compName;
}

export function getProps<T extends object = {}>(data: IslandData<T>) {
  return data.props || {};
}

export function getStrategy<T extends object = {}>(
  data: IslandData<T>
): StrategyContext | null {
  if (data.media) {
    return { name: "media", payload: data.media };
  }

  if (data.visible) {
    return { name: "visible" };
  }

  if (data.load) {
    return { name: "load" };
  }

  return null;
}

export function observeOnce(element: Element, fn: () => void) {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const callback: IntersectionObserverCallback = async (entries) => {
    entries.forEach(async (entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(element);

      await fn();
    });
  };

  const observer = new IntersectionObserver(callback, options);

  if (element) {
    observer.observe(element);
  }
}

export function listenMediaOnce(query: string, fn: () => void) {
  const mediaQuery = window.matchMedia(query);

  const queryHandler = (event: MediaQueryList | MediaQueryListEvent) => {
    if (event.matches) {
      mediaQuery.removeEventListener("change", queryHandler);
      fn();
    }
  };

  queryHandler(mediaQuery);

  mediaQuery.addEventListener("change", queryHandler);
}

export async function hydrateOne(
  island: Element,
  factories: Record<string, ReactFactory>,
) {
  const data = getData(island.querySelector("script"));
  
  const strategy = getStrategy(data);
  if (!strategy) return;

  const factory = factories[data.componentName];
  if (typeof factory !== "function") return;

  const hydrate = async () => {
    const Component = (await factory()).default;
    if (!Component) return;

    const props = getProps(data);
    hydrateRoot(island, <Component {...props} />);
  };

  const handlers: any = {
    load: async () => {
      await hydrate();
      console.log("hydrated ", data.componentName);
    },
    visible: () => {
      observeOnce(island, async () => {
        await hydrate();
        console.log("observed and hydrated", data.componentName);
      });
    },
    media: async (payload: string) => {
      listenMediaOnce(payload, async () => {
        await hydrate();
        console.log(`${payload} matches and hydrated`, data.componentName);
      });
    },
  };
  const handler = handlers[strategy.name];
  await handler?.(strategy?.payload);
}
