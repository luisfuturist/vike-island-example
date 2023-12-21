import { createCommentVNode, h } from "vue";
import { ClientDirective, IslandOptions, Props } from "../core/types";
import { ISLAND_END, ISLAND_START, SCRIPT_TYPE, createIsland, unwrap } from "../core/utils";

function withHydration<P extends Props>(component: any, options?: IslandOptions) {
  component = unwrap(component);

  const hydratable = (props: P & ClientDirective) => {
    const { json, tag, attrs } = createIsland(component, props, options);

    return h(tag, attrs, [
      createCommentVNode(ISLAND_START),
      h("script", {
        type: SCRIPT_TYPE,
        innerHTML: json,
      }),
      createCommentVNode(ISLAND_END),
    ]);
  };
  hydratable.component = component;
  hydratable.__hydratable = true;

  return hydratable;
}

export default withHydration;
