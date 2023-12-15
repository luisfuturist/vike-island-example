import { Factory } from "../island/core/types";

const factories: Record<string, Factory> = {
  Counter: () => import("../components/Counter.react"),
  Clock: () => import("../components/Clock.react"),
  VGreenCounter: () => import("../components/VGreenCounter.vue"),
};

export default factories;