export type Factory = string | (() => Promise<{ default: AnyComponent }>);
export type Props = Record<string, unknown>;

export type IslandOptions = {
  tag?: string;
};

export type IslandProps<T = any> = {
  component: T;
  loader?: Loader;
  tag?: string;
  strategy?: Strategy;
};

export type Loader = () => Props;

export type RenderData = {
  componentName: string;
  props: Props;
  framework: string;
};
export type HydrationData = RenderData & {
  strategy: Strategy;
};

export type onHydrationEnd = (data: HydrationData) => void;

export type StrategyObject<T = any> = { name: string; payload?: T };
export type Strategy<T = any> = string | StrategyObject<T>;

export type ClientVisible = {
  "client:visible": true;
  "client:load"?: false;
  "client:media"?: false;
};
export type ClientLoad = {
  "client:load"?: true;
  "client:visible"?: false;
  "client:media"?: false;
};
export type ClientMedia = {
  "client:media": string;
  "client:visible"?: false;
  "client:load"?: false;
};

export type ClientDirective = ClientVisible | ClientLoad | ClientMedia;

export type Integration = {
  name: string;
  getComponentName(component: any): string;
  renderToString(component: any, props: Props): Promise<string>;
  hydrate(
    component: any,
    props: Props,
    container: Element
  ): Promise<void> | void;
  identify(component: any): boolean;
};