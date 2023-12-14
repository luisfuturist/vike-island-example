import { useEffect, useState } from "react";

const Clock = () => {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSec((c) => c + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div style={{ color: "#333" }}>{sec}s</div>;
};

export default Clock;
