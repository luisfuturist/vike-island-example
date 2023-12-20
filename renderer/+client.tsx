// This is the client-entry for our HTML-only pages.

import { onHydrationEnd } from "~/island/core/types";
import { hydrate } from "../island/core";
import factories from "./+factories";

console.log("hydrating islands");

const onHydrate: onHydrationEnd = (data) => {
  console.log("hydrated", data);
};

hydrate(factories, onHydrate);
