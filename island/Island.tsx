import { ComponentType, createElement } from "react";
import { IslandOptions } from "./types";
import { getComponentName } from "./utils";

type Props<T extends ComponentType> = IslandOptions<T>;

function Island<T extends ComponentType<any>>(props: Props<T>) {
  const componentName = getComponentName(props.component);
  const data = props.loader?.({ name: componentName }) || {};

  const islandData = {
    media: props.media,
    load: props.load,
    visible: props.visible,
    componentName,
    props: data,
  };

  const el = createElement(
    props.tag || "div",
    { "data-island": "" },
    <>
      <props.component {...data} />
      <script
        type="application/island-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(islandData) }}
      />
    </>
  );

  return el;
}

export default Island;
