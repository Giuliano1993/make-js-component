import { createSignal } from "solid-js";
import styles from "./ComponentName.module.css";

export default function ComponentName() {
	const [count, setCount] = createSignal(0);

	return (
		<div class={styles.ComponentName}>
			<button onClick={() => setCount(count() + 1)}>
				Hello ComponentName: {count()}
			</button>
		</div>
	);
}