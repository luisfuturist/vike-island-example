export type ReactFactory = () => Promise<{ default: React.ComponentType<any> }>;

export type Visible = { visible: true; load?: false; media?: false };
export type Load = { load?: true; visible?: false; media?: false };
export type Media = { media: string; visible?: false; load?: false };

export type Strategy = Visible | Load | Media;

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

export type IslandData<T extends object> = {
  componentName: string;
  props: T;
} & Strategy;

export type IslandLoader<T extends ComponentType<any>> =
  () => ComponentProps<T>;

export type IslandOptions<T extends ComponentType<any>> = {
  component: T;
  loader?: IslandLoader;
  tag?: string;
} & Strategy;

export type WithIslandOptions = {
  tag?: string;
} & Strategy;

export type StrategyContext<T = any> = { name: string; payload?: T };