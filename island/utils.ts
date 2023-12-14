import { ComponentProps, ComponentType } from "react";
import { IslandData } from "./types";

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

export function getStrategy<T extends object = {}>(data: IslandData<T>) {
  if (data.media) {
    return { name: "media", payload: data.media };
  }

  if (data.load) {
    return { name: "load" };
  }

  if (data.visible) {
    return { name: "visible" };
  }

  return { name: "none" };
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
