import { hydrate } from "../island";

console.log("hydrating islands");

hydrate({
  Counter: () => import("../components/Counter"),
  Clock: () => import("../components/Clock"),
});