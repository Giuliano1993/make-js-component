import { component$, useTask$, useStore } from '@builder.io/qwik';

interface State {
  count: number;
  debounced: number;
}

export default component$(() => {
  const store = useStore<State>({
    count: 0,
    debounced: 0,
  });

  // useTask$ hook for managing side effects
  useTask$(({ track }) => {
    // Track changes in the 'count' property of the store
    // 'track' is a function that takes a function argument. The passed function should
    // return the piece of state or prop that we want to 'watch' or 'track'.
    // Here, it's tracking changes to 'store.count'.
    track(() => store.count);

    // The code inside this block runs every time 'store.count' changes.
    // Debounce logic begins here
    // Setup a timer to update the debounced count after a delay
    const timer = setTimeout(() => {
      // This code is executed after 2 seconds of the last change in store.count
      // If 'store.count' changes within 2 seconds, this code will not run until
      // there are no changes for a continuous 2 seconds.
      store.debounced = store.count;
    }, 2000); // Delay of 2000 milliseconds (2 seconds)

    // Cleanup function: This function is returned from the useTask$ block.
    // It's executed when the component unmounts or before the useTask$ block runs again.
    // Here, it's used to clear the previous timer (if any) when 'store.count' changes.
    // This is an essential part of the debounce logic, preventing the previous
    // setTimeout call from completing if 'store.count' changes again within 2 seconds.
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div>
      <Child state={store} />
      <button id="add" onClick$={() => store.count++}>
        +
      </button>
    </div>
  );
});

// Define a Child component to display the current count
export const Child = component$((props: { state: State }) => {
  return (
    <div>
      <div id="child">{props.state.count}</div>
      <GrandChild state={props.state} />
    </div>
  );
});

// Define a GrandChild component to display the debounced count
export const GrandChild = component$((props: { state: State }) => {
  return <div id="debounced">Debounced: {props.state.debounced}</div>;
});
