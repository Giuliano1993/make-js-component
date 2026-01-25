import { createSignal } from "solid-js";

export default function ComponentName() {
	const [count, setCount] = createSignal(0);

	return (
		<div class="text-lg font-bold">
			<button onClick={() => setCount(count() + 1)}>
				Hello ComponentName: {count()}
			</button>
		</div>
	);
}