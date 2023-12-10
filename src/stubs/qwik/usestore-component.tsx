import { component$, useStore } from "@builder.io/qwik";

export default component$(() => {
	// useStore is a hook that creates a reactive state object in Qwik
	// Here, a store with a single property 'count' initialized to 0 is created
	// The store is reactive, meaning any changes to its properties will
	// trigger a re-render of the component that uses it
	const store = useStore({ count: 0 });

	return (
		<main>
			<p>Count: {store.count}</p>
			<p>
				<button onClick$={() => store.count++}>Click</button>
			</p>
		</main>
	);
});
