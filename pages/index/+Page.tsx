import ClockComponent from "~/components/Clock.react";
import RCounter from "~/components/Counter.react";
import VGreenCounter from "~/components/VGreenCounter.vue";
import { withIsland } from "~/island/react";

const Counter = withIsland(RCounter);
const Clock = withIsland(ClockComponent);
const GreenCounter = withIsland(VGreenCounter);

export const documentProps = {
  title: "React Page"
}

export default () => {
  return (
    <div>
      <h2>Not Hydrated</h2>
      <RCounter count={0} />

      <h2>Hydrated only on mobile</h2>
      <Clock client:media="(max-width: 576px)" />

      <h2>Hydrated on Load</h2>
      <Counter client:load count={4} />

      <div style={{ marginBottom: "1000px" }}></div>

      <h2>React Hydrated on Scroll</h2>
      <Clock client:visible />

      <div style={{ marginBottom: "1000px" }}></div>

      <h2>Vue Hydrated on Scroll</h2>

      <GreenCounter count={1} client:visible />
    </div>
  );
};

