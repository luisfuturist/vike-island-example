import { Factory } from "./types";
import { getData } from "./utils";

function showHydrationWarnings(
  islands: Element[],
  factories: Record<string, Factory>
) {
  const factoriesNum: number = Object.keys(factories).length;
  const markersNum: number = islands.length;
  const missingComponentNames = getFactoriesMissing(islands, factories);
  const unmarkedComponentNames = getUnmarkedFactories(islands, factories);
  const hasMissingComponents = !!missingComponentNames.length;
  const hasUnmarkedComponents = !!unmarkedComponentNames.length;
  const hasComps = !!factoriesNum;
  const hasMarkers = !!markersNum;
  const warn = (msg: string) => console.warn("[vike-react-island]", msg);

  if (hasMarkers && !hasComps) {
    warn(
      `You used withIsland ${markersNum} time(s) but did not provide any factories. Therefore no island will be hydrated`
    );
  }

  if (hasComps && !hasMarkers) {
    warn(
      `You provided ${factoriesNum} factory(s) to hydrate but did not use withIsland on your components. Therefore no islands will be hydrated`
    );
  }

  if (hasMissingComponents) {
    warn(
      `You are using withIsland with ${missingComponentNames.join(
        ", "
      )}, but did not provide the respective factory(s) in your call of \`hydrate()\``
    );
  }

  if (hasUnmarkedComponents) {
    warn(
      `You are providing ${unmarkedComponentNames.join(
        ", "
      )}, but do not have any instances of this/these component(s) on your page`
    );
  }
}

export default showHydrationWarnings;

function getFactoriesMissing(
  islands: Element[],
  factories: Record<string, Factory>
) {
  const factoriesMissing: string[] = [];

  const existingFactoryKeys = Object.keys(factories);

  for (let island of islands) {
    const data = getData(island.querySelector("script"));

    if (!existingFactoryKeys.includes(data.componentName)) {
      factoriesMissing.push(data.componentName);
    }
  }

  return factoriesMissing;
}

function getUnmarkedFactories(
  islands: Element[],
  factories: Record<string, Factory>
) {
  const unmarkedComponentNames: string[] = [];

  const markedFactories = [];

  for (let island of islands) {
    const data = getData(island.querySelector("script"));

    markedFactories.push(data.componentName);
  }

  const existingFactoryKeys = Object.keys(factories);

  for (const componentName of existingFactoryKeys) {
    if (!markedFactories.includes(componentName)) {
      unmarkedComponentNames.push(componentName);
    }
  }

  return unmarkedComponentNames;
}
