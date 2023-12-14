import { hydrateRoot } from "react-dom/client";
import showHydrationWarnings from "./showHydrationWarnings";
import { ReactFactory } from "./types";
import {
  getData,
  getIslands,
  getProps,
  getStrategy,
  listenMediaOnce,
  observeOnce,
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
    const data = getData(island.querySelector("script"));
    const factory = factories[data.componentName];

    if (typeof factory !== "function") break;

    const hydrate = async () => {
      const Component = (await factory()).default;
      if (!Component) return;

      const data = getData(island.querySelector("script"));
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

    const strategy = getStrategy(data);
    const handler = handlers[strategy.name];
  
    if (!handler) {
      throw new Error("Island strategy should be 'load' or 'viewport'.");
    }

    await handler(strategy.payload);
  }
}

export default hydrate;
