export type ReactFactory = () => Promise<{ default: React.ComponentType<any> }>;

export type Not<T> = {
  [P in keyof T]?: void | false;
};

export type Visible = { visible: true };
export type Load = { load: true };

export type StrategyProps = (Visible & Not<Load>) | (Load & Not<Visible>);

export type IslandStrategy = "load" | "viewport";

export type IslandData<T extends object> = {
  media?: string;
  strategy: IslandStrategy;
  componentName: string;
  props: T;
};

export type IslandLoader<T extends ComponentType<any>> =
  () => ComponentProps<T>;

export type IslandOptions<T extends ComponentType<any>> = {
  component: T;
  loader?: IslandLoader;
  tag?: string;
} & StrategyProps;

export type IslandOptionsWithoutComponent = {
  loader?: IslandLoader;
  tag?: string;
} & StrategyProps;
