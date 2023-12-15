import { IslandData } from "./types";

export const ISLAND_START = '__ISLAND_START__';
export const ISLAND_END = '__ISLAND_END__';

export const SCRIPT_START = '<script type="application/island-data">';
export const SCRIPT_END = '</script>';

export const ISLAND_MARKER_PATTERN = new RegExp(`${ISLAND_START}(.*?)${ISLAND_END}`, 'g');
export const SCRIPT_MARKER_PATTERN = new RegExp(`${SCRIPT_START}(.*?)${SCRIPT_END}`, 'g');

export function getIslands(container: Element | Document) {
  const islands = container.querySelectorAll("[data-island]");
  return Array.from(islands);
}

export function getData<T extends object = {}>(
  dataScript: Element | null
): IslandData<T> {
  return dataScript ? JSON.parse(dataScript.innerHTML) : {};
}
