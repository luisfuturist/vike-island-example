import { ComponentProps, FC } from "react";
import Island from "./Island";
import { ClientDirective, WithIslandOptions } from "./types";

function withIsland<T extends FC<any>>(
  component: T,
  options?: WithIslandOptions
) {
  return (props: ComponentProps<T> & ClientDirective) => {
    return (
      <Island
        tag={options?.tag}
        component={component}
        loader={() => props}
        visible={(props as any)["client:visible"]}
        load={(props as any)["client:load"]}
        media={(props as any)["client:media"]}
      />
    );
  };
}

export default withIsland;
