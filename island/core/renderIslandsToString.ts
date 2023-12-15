import { JSDOM } from "jsdom";
import { getData } from "./utils";
import { Factory } from "./types";
import { agnosticRenderToString } from "./component/agnosticRenderToString";
import { getProps } from "./component/utils";

async function renderIslandsToString(
  pageHtml: string,
  factories: Record<string, Factory>
) {
  const dom = new JSDOM(pageHtml);
  const vueIslands = Array.from(
    dom.window.document.querySelectorAll("[data-island]")
  );

  for (let island of vueIslands) {
    const data = getData(island.querySelector("script"));
    const props = getProps(data);

    const factory = factories[data.componentName];
    if (typeof factory !== "function") continue;
    
    const Component = (await factory()).default;
    if (!Component) continue;
    const html = await agnosticRenderToString(Component, props);

    const script = island.querySelector("script");
    const scriptHtml = script?.outerHTML!;

    const newIsland = dom.window.document.createElement(island.tagName);
    newIsland.setAttribute("data-island", island.getAttribute("data-island")!);
    newIsland.innerHTML = html + scriptHtml;

    island.replaceWith(newIsland);
  }

  return dom.serialize();
}

export default renderIslandsToString;
