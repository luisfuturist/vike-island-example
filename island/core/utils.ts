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