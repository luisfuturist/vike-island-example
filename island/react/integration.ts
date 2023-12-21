import { withHydration } from ".";
import { Integration } from "../core/types";

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
  withHydration(component, options) {
    return withHydration(component, options);
  },
};

export default react;
