import { createSSRApp } from "vue";
import { Props } from "../types";
import { getComponentFramework } from "./utils";

export async function agnosticRenderToString(Component: any, props: Props) {
  const framework = getComponentFramework(Component);

  const handlers = {
    vue: async () => {
      const { renderToString: vueRenderToString } = await import(
        "vue/server-renderer"
      );
      const app = createSSRApp(Component, props);
      return await vueRenderToString(app);
    },
    react: async () => {
      const { renderToString: reactRenderToString } = await import(
        "react-dom/server"
      );

      return reactRenderToString(<Component {...props} />);
    },
  };
  const handler = handlers[framework];

  if (!handler) {
    throw new Error("No render handler available for " + framework);
  }

  return await handler();
}
