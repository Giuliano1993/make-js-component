import { useState } from "@builder.io/mitosis";

export default function ComponentName(props) {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello {props.name || "ComponentName"}</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}