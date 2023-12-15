import { hydrateFrameworkComponent } from "./component/agnosticHydrate";
import { getProps } from "./component/utils";
import { listenMediaOnce } from "./strategy/listenToMediaOnce";
import { observeOnce } from "./strategy/observeOnce";
import { getStrategy } from "./strategy/utils";
import { Factory } from "./types";
import { getData } from "./utils";

export async function hydrateIsland(
  island: Element,
  factories: Record<string, Factory>
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
    hydrateFrameworkComponent(island, Component, props);
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