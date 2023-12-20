import integrations from "./integrations";
import { Factory } from "./types";
import {
  ISLAND_MARKER_PATTERN,
  SCRIPT_END,
  SCRIPT_MARKER_PATTERN,
  SCRIPT_START,
  getComponent,
  parseHydrationData,
  getProps,
  identifyIntegration,
} from "./utils";

async function renderIslandsToString(
  html: string,
  factories: Record<string, Factory>
) {
  const islands = html.match(ISLAND_MARKER_PATTERN);

  if (!islands) {
    return html;
  }

  const renderedIslandPromises = islands.map(async (island) => {
    const extractedContent: string[] = [];
    let children;

    while ((children = SCRIPT_MARKER_PATTERN.exec(island)) !== null) {
      extractedContent.push(children[1]);
    }

    const jsonString = extractedContent[0];
    const hydrationData = parseHydrationData(jsonString);

    const factory = factories[hydrationData.componentName];
    if (!factory) return island;

    const Component = await getComponent(factory);
    if (!Component) return island;

    const integration = identifyIntegration(Component, integrations);
    const renderToString = integration?.renderToString;
    if (!renderToString) return island;
    
    const props = getProps(hydrationData);
    const html = await renderToString(Component, props);
    
    const shouldHydrate = hydrationData.strategy !== "none";
    const islandString = shouldHydrate
      ? html + SCRIPT_START + jsonString + SCRIPT_END
      : html;

    return islandString;
  });

  const replacedContent = await Promise.all(renderedIslandPromises);
  let i = 0;

  const htmlWithIslandsString = html.replace(ISLAND_MARKER_PATTERN, () =>
    i < replacedContent.length ? replacedContent[i++] : ""
  );

  return htmlWithIslandsString;
}

export default renderIslandsToString;
