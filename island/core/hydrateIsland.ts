import integrations from "./integrations";
import { idle, listenMediaOnce, observeOnce } from "./strategies";
import { Factory, onHydrationEnd } from "./types";
import {
  getComponent,
  parseHydrationData,
  getProps,
  getStrategy,
  identifyIntegration,
} from "./utils";

export async function hydrateIsland(
  island: Element,
  factories: Record<string, Factory>,
  onHydrationEnd?: onHydrationEnd
) {
  const data = parseHydrationData(island.querySelector("script")?.innerHTML);

  const strategy = getStrategy(data);
  if (!strategy) return;

  const factory = factories[data.componentName];
  if (!factory) return;

  const hydrate = async () => {
    let component = await getComponent(factory);
    if (!component) return;

    const props = getProps(data);

    const integration = identifyIntegration(component, integrations);
    const hydrate = integration?.hydrate;
    if (!hydrate) return;

    await hydrate(component, props, island);

    onHydrationEnd?.({
      componentName: integration.getComponentName(component),
      props,
      framework: integration.name,
      strategy,
    });
  };

  const handlers: any = {
    load: async () => {
      await hydrate();
    },
    visible: () => {
      observeOnce(island, async () => {
        await hydrate();
      });
    },
    media: async (payload: string) => {
      listenMediaOnce(payload, async () => {
        await hydrate();
      });
    },
    idle: async () => {
      idle(async () => await hydrate());
    },
  };

  const handler = handlers[strategy.name];
  await handler?.(strategy?.payload);
}
