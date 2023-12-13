import { ComponentProps, ComponentType } from "react";
import Island from "./Island";
import { IslandOptions, IslandOptionsWithoutComponent } from "./types";

function withIsland<T extends ComponentType<any>>(
  component: T,
  options?: IslandOptionsWithoutComponent
) {
  return (props: ComponentProps<T>) => {
    const islandProps = (options || {}) as IslandOptions<T>;
    islandProps.loader ??= () => props;
    islandProps.component = component;

    return <Island {...islandProps} />;
  };
}

export default withIsland;
