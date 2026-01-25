import { Component, createSignal } from "solid-js";
import styles from "./ComponentName.module.css";

interface ComponentNameProps {}

const ComponentName: Component<ComponentNameProps> = (props) => {
	const [count, setCount] = createSignal(0);

	return (
		<div class={styles.ComponentName}>
			<button onClick={() => setCount(count() + 1)}>
				Hello ComponentName: {count()}
			</button>
		</div>
	);
};

export default ComponentName;