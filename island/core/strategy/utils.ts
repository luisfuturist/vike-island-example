import { IslandData, Props } from "../types";
import { ClientDirective, StrategyContext, StrategyProps } from "./types";

export function getStrategy<T extends object = {}>(
  data: IslandData<T>
): StrategyContext | null {
  if (data.media) {
    return { name: "media", payload: data.media };
  }

  if (data.visible) {
    return { name: "visible" };
  }

  if (data.load) {
    return { name: "load" };
  }

  return null;
}

export function getStrategyProps(props: Props | ClientDirective) {
  return {
    visible: props["client:visible"],
    load: props["client:load"],
    media: props["client:media"],
  } as StrategyProps;
}
