import integrations from "./integrations";
import renderIslandsToString from "./renderIslandsToString";
import { Factory, Props } from "./types";
import { identifyIntegration } from "./utils";

async function render(
  component: any,
  props: Props,
  factories: Record<string, Factory>
) {
  const integration = identifyIntegration(component, integrations);
  const renderToString = integration?.renderToString;
  if (!renderToString) return "";

  (globalThis as any).__framework = integration?.name;

  let pageHtml = await renderToString(component, props);
  pageHtml = await renderIslandsToString(pageHtml, factories);
  
  return pageHtml;
}

export default render;