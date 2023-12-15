import { AnyComponent, AnyProps } from "../core/component/types";
import { getLoader } from "../core/component/utils";
import { ClientDirective } from "../core/strategy/types";
import { getStrategyProps } from "../core/strategy/utils";
import { Props, WithIslandOptions } from "../core/types";
import Island from "./Island";

function withIsland<T extends any, P extends Props>(
  component: AnyComponent<T>,
  options?: WithIslandOptions
) {
  return (props: AnyProps<typeof component, P> & ClientDirective) => {
    return (
      <Island
        tag={options?.tag}
        component={component}
        loader={getLoader(props)}
        {...getStrategyProps(props)}
      />
    );
  };
}

export default withIsland;
