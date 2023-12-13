import { Island } from "../../island";
import Counter from "./Counter";

export default () => {
  return (
    <div>
      <h2>Not Hydrated</h2>
      <Counter count={0} />

      <div style={{ marginBottom: "1000px" }}></div>

      <h2>Hydrated on Scroll</h2>

      <Island
        component={Counter}
        loader={() => ({
          count: 1,
        })}
        visible
      />
    </div>
  );
};
