import { Component, createSignal } from "solid-js";

interface ComponentNameProps {}

const ComponentName: Component<ComponentNameProps> = (props) => {
	const [count, setCount] = createSignal(0);

	return (
		<div>
			<button onClick={() => setCount(count() + 1)}>
				Hello ComponentName: {count()}
			</button>
		</div>
	);
};

export default ComponentName;