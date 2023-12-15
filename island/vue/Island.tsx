import { defineComponent, h } from "vue";
import {
  getComponentFramework,
  getComponentName,
  getComponentProps,
} from "../core/component/utils";

const Island = defineComponent({
  props: {
    component: {
      type: Object,
      required: true,
    },
    media: {
      type: String,
      default: "",
    },
    load: {
      type: Boolean,
      default: false,
    },
    visible: {
      type: Boolean,
      default: true,
    },
    loader: {
      type: Function,
      default: () => {},
    },
    tag: {
      type: String,
      default: "div",
    },
  },
  setup(props) {
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

    return () => {
      return h(props.tag || "div", { "data-island": framework }, [
        "Island",
        h("script", {
          type: "application/island-data",
          innerHTML: JSON.stringify(islandData),
        }),
      ]);
    };
  },
});

export default Island;
