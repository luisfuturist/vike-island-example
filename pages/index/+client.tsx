import { hydrate } from "../../island";

console.log("hydrating islands");

hydrate({
  Counter: () => import("./Counter"),
});
