import ClockReact from "~/components/Clock";
import CounterReact from "~/components/Counter";
import Section from "~/components/Section.react";
import VGreenCounterVue from "~/components/VGreenCounter.vue";
import { withHydration } from "~/island/react";

const Counter = withHydration(CounterReact);
const Clock = withHydration(ClockReact);
const GreenCounter = withHydration(VGreenCounterVue);

export default () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <a href="/vue">Access vue page</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>React page</h1>

        <h2>Not hydrated</h2>
        <Counter count={0} />

        <h2>Hydrated</h2>
        <Counter count={0} client:load />

        <Section client:visible />

        <div style={{ marginBottom: "1000px" }}></div>

        <h2>React component hydrated on scroll</h2>
        <Clock client:visible />

        <div style={{ marginBottom: "1000px" }}></div>

        <h2>Vue component hydrated on scroll inside a React page</h2>
        <GreenCounter count={1} client:visible />
      </main>
    </div>
  );
};
