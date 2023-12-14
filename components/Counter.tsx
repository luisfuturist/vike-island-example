import { FC, useState } from "react";

type Props = {
  count: number;
};

const Counter: FC<Props> = (props) => {
  const [count, setCount] = useState(props.count || 0);

  return <button onClick={() => setCount((s) => ++s)}>{count}</button>;
};
Counter.displayName = "Counter";

export default Counter;
