import { agnosticRenderToString } from "./component/agnosticRenderToString";
import { getProps } from "./component/utils";
import { Factory } from "./types";
import {
  ISLAND_MARKER_PATTERN,
  SCRIPT_END,
  SCRIPT_MARKER_PATTERN,
  SCRIPT_START,
  getData,
} from "./utils";

async function renderIslandsToString(
  pageHtml: string,
  factories: Record<string, Factory>
) {
  const matches = pageHtml.match(ISLAND_MARKER_PATTERN);

  if (!matches) {
    return pageHtml;
  }

  const replacedContentPromises = matches.map(async (match) => {
    const extractedContent: string[] = [];
    let match2;

    while ((match2 = SCRIPT_MARKER_PATTERN.exec(match)) !== null) {
      extractedContent.push(match2[1]);
    }

    const jsonString = extractedContent[0];
    const data = getData({ innerHTML: jsonString } as any);
    const props = getProps(data);
    const factory = factories[data.componentName];

    if (typeof factory !== "function") return match;

    const Component = (await factory()).default;
    if (!Component) return match;

    const html = await agnosticRenderToString(Component, props);
    const islandString = html + SCRIPT_START + jsonString + SCRIPT_END;

    return islandString;
  });

  const replacedContent = await Promise.all(replacedContentPromises);
  const processedString = pageHtml.replace(ISLAND_MARKER_PATTERN, () => replacedContent.shift() || "");

  return processedString;
}

export default renderIslandsToString;
