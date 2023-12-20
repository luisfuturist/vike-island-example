import { createElement } from "react";
import { ClientDirective, IslandOptions, Props } from "../core/types";
import {
  ISLAND_END,
  ISLAND_START,
  SCRIPT_END,
  SCRIPT_START,
  createIsland,
} from "../core/utils";

function withHydration<P extends Props>(component: any, options?: IslandOptions) {
  const hydratable = (props: P & ClientDirective) => {
    const { tag, attrs, json } = createIsland(component, props, options);

    const islandHtml =
      `<!--${ISLAND_START}-->` +
      SCRIPT_START +
      json +
      SCRIPT_END +
      `<!--${ISLAND_END}-->`;

    const el = createElement(tag, {
      ...attrs,
      dangerouslySetInnerHTML: {
        __html: islandHtml,
      },
    });

    return el;
  };
  hydratable.component = component;
  hydratable.__island = true;

  return hydratable;
}

export default withHydration;
