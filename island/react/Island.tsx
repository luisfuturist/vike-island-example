import { createElement } from "react";
import {
  getComponentFramework,
  getComponentName,
  getComponentProps,
} from "../core/component/utils";
import { IslandOptions } from "../core/types";

type Props<T extends any> = IslandOptions<T>;

function Island<T extends any>(props: Props<T>) {
  const framework = getComponentFramework(props.component);

  const componentName = getComponentName(props.component);
  const componentProps = getComponentProps(props.component, props.loader);

  const islandData = {
    media: props.media,
    load: props.load,
    visible: props.visible,
    componentName,
    props: componentProps,
  };

  const el = createElement(
    props.tag || "div",
    { "data-island": framework },
    <>
      __content__
      <script
        type="application/island-data"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(islandData) }}
      />
    </>
  );

  return el;
}

export default Island;
