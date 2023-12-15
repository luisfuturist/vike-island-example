import { IslandData, IslandLoader, Props } from "../types";

export function getComponentName(component: any): string {
  const compName = component.__name || component.displayName || component.name;
  if (!compName) throw new Error("No name provided for component");
  return compName;
}

export function getComponentProps(component: any, loader?: IslandLoader<any>) {
  return loader?.() || {};
}

export function getProps<T extends object = {}>(data: IslandData<T>) {
  return data.props || {};
}

export function getLoader(props: Props) {
  return () => {
    const p: any = { ...props };

    const directives = ["load", "visible", "media"];
    directives.forEach((directive) => void delete p["client:" + directive]);

    return p;
  };
}

export function getComponentFramework(component: any) {
  if ("setup" in component) {
    return "vue";
  }

  return "react";
}
