import { hydrateRoot } from "react-dom/client";
import showHydrationWarnings from "./showHydrationWarnings";
import { ReactFactory } from "./types";
import { getData, getIslands, getProps, observeOnce } from "./utils";

async function hydrate(
  factories: Record<string, ReactFactory>,
  container: Element | Document = document
) {
  const islands = getIslands(container);

  if (import.meta.env.DEV) {
    showHydrationWarnings(islands, factories);
  }

  for (let island of islands) {
    const data = getData(island.querySelector("script"));
    const factory = factories[data.componentName];

    const hydrate = async () => {
      const Component = (await factory()).default;

      const data = getData(island.querySelector("script"));
      const props = getProps(data);

      hydrateRoot(island, <Component {...props} />);
    };

    const handlers = {
      viewport: () => {
        observeOnce(island, async () => {
          await hydrate();
          console.log("observed and hydrated", data.componentName);
        });
      },
      load: async () => {
        await hydrate();
        console.log("hydrated ", data.componentName);
      },
    };

    const handler = handlers[data.strategy];
    if (!handler) {
      throw new Error("Island strategy should be 'load' or 'viewport'.");
    }

    await handler();
  }
}

export default hydrate;
