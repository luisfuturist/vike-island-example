import { createApp } from "vue";
import { Props } from "../types";
import { getComponentFramework } from "./utils";

export async function hydrateFrameworkComponent<T extends Props = {}>(
  island: Element,
  Component: any,
  props: T
) {
  const framework = getComponentFramework(Component);

  const handlers = {
    vue: async () => {
      const app = createApp(Component, props);
      app.mount(island);
    },
    react: async () => {
      const React = await import("react");
      const { hydrateRoot } = await import("react-dom/client");
      hydrateRoot(island, React.createElement(Component, props));
    }
  }
  const handler = handlers[framework];

  if(!handler) {
    throw new Error("No hydration handler available for " + framework)
  }

  await handler();
}
