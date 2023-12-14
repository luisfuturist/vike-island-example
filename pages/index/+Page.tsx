import { withIsland } from "../../island";
import CounterComponent from "../../components/Counter";
import ClockComponent from "../../components/Clock"

const Counter = withIsland(CounterComponent);
const Clock = withIsland(ClockComponent);

export default () => {
  return (
    <div>
      <h2>Not Hydrated</h2>
      <CounterComponent count={0} />

      <h2>Hydrated on Load</h2>
      <Counter client:load count={2} />

      <div style={{ marginBottom: "1000px" }}></div>

      <h2>Hydrated on Scroll</h2>
      <Clock client:visible />

      <h2>Hydrated only on mobile</h2>
      <Clock client:media="(max-width: 576px)" />
    </div>
  );
};
