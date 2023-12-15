export type Factory = () => Promise<{ default: AnyComponent }>;

export type IslandData<T extends object> = {
  componentName: string;
  props: T;
} & StrategyProps;

export type IslandLoader<T extends ComponentType<any>> =
  () => ComponentProps<T>;

export type IslandOptions<T extends ComponentType<any>> = {
  component: T;
  loader?: IslandLoader;
  tag?: string;
} & StrategyProps;

export type WithIslandOptions = {
  tag?: string;
} & StrategyProps;

export type Props = Record<string, unknown>;

