import { h } from "vue";
import { AnyComponent, AnyProps } from "../core/component/types";
import { getLoader } from "../core/component/utils";
import { ClientDirective } from "../core/strategy/types";
import { Props, WithIslandOptions } from "../core/types";
import Island from "./Island";
import { getStrategyProps } from "../core/strategy/utils";

function island<T extends any, P extends Props>(
  component: AnyComponent<T>,
  options?: WithIslandOptions
) {
  return (props: AnyProps<typeof component, P> & ClientDirective) => {
    return h(Island, {
      tag: options?.tag,
      component,
      loader: getLoader(props),
      ...getStrategyProps(props) as any
    });
  };
}

export default island;
