import { withHydration } from ".";
import { Integration } from "../core/types";

export const vue: Integration = {
  name: "vue",
  identify(component) {
    return "setup" in component;
  },
  getComponentName(component) {
    const compName = component.name || component.__name;
    if (!compName) throw new Error("No name provided for the Vue component");
    return compName;
  },
  async renderToString(component, props) {
    const { renderToString: vueRenderToString } = await import(
      "vue/server-renderer"
    );
    const { createSSRApp } = await import("vue");
    const app = createSSRApp(component, props);
    return await vueRenderToString(app);
  },
  async hydrate(component, props, container) {
    const { createApp } = await import("vue");
    const app = createApp(component, props);
    app.mount(container);
  },
  withHydration(component, options) {
    return withHydration(component, options);
  },
};

export default vue;
