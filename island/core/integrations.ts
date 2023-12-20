import { Integration } from "./types";

const react: Integration = {
  name: "react",
  getComponentName(component) {
    const compName = component.displayName || component.name;
    if (!compName) throw new Error("No name provided for component");
    return compName;
  },
  async renderToString(component, props) {
    const { createElement } = await import("react");
    const { renderToString: reactRenderToString } = await import(
      "react-dom/server"
    );
    return reactRenderToString(createElement(component, props));
  },
  async hydrate(component, props, container) {
    const { createElement } = await import("react");
    const { hydrateRoot } = await import("react-dom/client");
    hydrateRoot(container, createElement(component, props));
  },
  identify(component) {
    return (
      typeof component === "function" &&
      ("displayName" in component || "name" in component)
    );
  },
};

export const vue: Integration = {
  name: "vue",
  identify(component) {
    return "setup" in component;
  },
  getComponentName(component) {
    const compName = component.__name;
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
};

export default [vue, react];
