import showHydrationWarnings from "./showHydrationWarnings";
import { ReactFactory } from "./types";
import {
  getIslands,
  hydrateOne
} from "./utils";

async function hydrate(
  factories: Record<string, ReactFactory>,
  container: Element | Document = document
) {
  const islands = getIslands(container);

  if (import.meta.env.DEV) {
    showHydrationWarnings(islands, factories);
  }

  for (let island of islands) {
    hydrateOne(island, factories);
  }
}

export default hydrate;
