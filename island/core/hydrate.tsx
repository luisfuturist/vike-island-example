import { hydrateIsland } from "./hydrateIsland";
import showHydrationWarnings from "./showHydrationWarnings";
import { Factory } from "./types";
import { getIslands } from "./utils";

async function hydrate(
  factories: Record<string, Factory>,
  container: Element | Document = document
) {
  const islands = getIslands(container);

  if (import.meta.env.DEV) {
    showHydrationWarnings(islands, factories);
  }

  for (let island of islands) {
    hydrateIsland(island, factories);
  }
}

export default hydrate;
