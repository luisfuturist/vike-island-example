import integrations from "./integrations";
import {
  ClientDirective,
  HydrationData,
  Integration,
  IslandOptions,
  Props,
  Strategy,
  StrategyObject,
} from "./types";

export const ISLAND_START = "__ISLAND_START__";
export const ISLAND_END = "__ISLAND_END__";

export const SCRIPT_TYPE = "application/island-data";
export const SCRIPT_START = `<script type="${SCRIPT_TYPE}">`;
export const SCRIPT_END = "</script>";

export const ISLAND_MARKER_PATTERN = new RegExp(
  `<!--${ISLAND_START}-->(.*?)<!--${ISLAND_END}-->`,
  "g"
);
export const SCRIPT_MARKER_PATTERN = new RegExp(
  `${SCRIPT_START}(.*?)${SCRIPT_END}`,
  "g"
);

export function getIslands(container: Element | Document) {
  const islands = container.querySelectorAll("[data-island]");
  return Array.from(islands);
}

export function parseHydrationData(jsonString?: string): HydrationData {
  return jsonString ? JSON.parse(jsonString) : {};
}

export function getProps(data: HydrationData) {
  return data.props || {};
}

export function getStrategy(data: HydrationData): StrategyObject | null {
  if (typeof data.strategy === "string") {
    return { name: data.strategy };
  }

  if (typeof data.strategy === "object") {
    return { name: data.strategy.name, payload: data.strategy.payload };
  }

  return null;
}

export function identifyIntegration(
  component: unknown,
  integrations: Integration[]
) {
  let framework = null;

  for (let integration of integrations) {
    if (integration.identify(component)) {
      return integration;
    }
  }

  return framework;
}

export function getPropsWithoutDirectives(props: Props) {
  const propsWithoutDirectives: Props = { ...props };

  const directives = ["load", "visible", "media", "idle", "none"];
  directives.forEach(
    (directive) => void delete propsWithoutDirectives["client:" + directive]
  );

  return propsWithoutDirectives;
}

export function getStrategyFromProps(props: Props | ClientDirective) {
  let strategy = "none" as Strategy;

  if (props["client:load"] === "" || props["client:load"]) {
    strategy = "load";
  }
  if (props["client:visible"] === "" || props["client:visible"]) {
    strategy = "visible";
  }
  if (props["client:media"]) {
    strategy = { name: "media", payload: props["client:media"] as string };
  }
  if (props["client:idle"]) {
    strategy = "idle";
  }

  return strategy;
}

export function getTag(options?: IslandOptions) {
  return options?.tag || "div";
}

export async function getComponent(factory: any) {
  let Component;

  if (typeof factory === "string") {
    Component = (await import(/* @vite-ignore */ factory)).default;
  }

  if (typeof factory === "function") {
    Component = (await factory()).default;
  }

  const isWrappedWithHoc =
    typeof Component === "function" && Component.__island;

  if (isWrappedWithHoc) Component = Component.component;

  return Component;
}

export function getHydrationData(
  component: any,
  props: Props | ClientDirective
) {
  const integration = identifyIntegration(component, integrations);
  if (!integration) return;

  const hydrationData: HydrationData = {
    strategy: getStrategyFromProps(props),
    componentName: integration
      .getComponentName(component)?.replace(/\.island+$/, ""),
    props: getPropsWithoutDirectives(props),
    framework: integration.name,
  };

  return hydrationData;
}

export function hasStrategy(hydrationData?: HydrationData) {
  return hydrationData?.strategy && hydrationData?.strategy !== "none";
}

export function createIsland(
  component: any,
  props: Props,
  options?: IslandOptions
) {
  const hydrationData = getHydrationData(component, props);
  const attrs = { "data-island": hasStrategy(hydrationData) ? "" : undefined };

  return {
    tag: getTag(options),
    attrs,
    json: JSON.stringify(hydrationData),
  };
}

export function factories(modules: Record<string, any>) {
  const transformedModules: Record<string, any> = {};

  for (const key in modules) {
    if (Object.prototype.hasOwnProperty.call(modules, key)) {
      const fileName = key
        ?.split("/")
        ?.pop()
        ?.replace(/\.island.[^/.]+$/, "");
      if (!fileName) continue;
      transformedModules[fileName] = modules[key];
    }
  }

  return transformedModules;
}

export function unwrap(wrappedComponent: any) {
  if (!wrappedComponent) return wrappedComponent;
  return "component" in wrappedComponent
    ? wrappedComponent.component
    : wrappedComponent;
}
