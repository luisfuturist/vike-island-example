import { ComponentProps, ComponentType } from "react";
import { IslandData } from "./types";

export function getIslands(container: Element | Document) {
  const islands = container.querySelectorAll("[data-island]")
  return Array.from(islands);
}

export function getData(dataScript: Element | null): IslandData<any> {
  return dataScript ? JSON.parse(dataScript.innerHTML) : {};
}

export function getComponentName(
  component: ComponentType<ComponentProps<any>>
): string {
  const compName = component.displayName || component.name;
  if (!compName) throw new Error("No name provided for component");
  return compName;
}

export function getProps<T extends object>(data: IslandData<T>) {
  return data.props || {};
}

export function observeOnce(
  element: Element,
  fn: () => void
) {
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