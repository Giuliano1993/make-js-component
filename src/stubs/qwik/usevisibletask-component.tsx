import { component$, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div>
      <p>Scroll down to see the message from the lazy-loaded component.</p>
      <div style={{ height: '1000px' }}></div> {/* Spacer to demonstrate scrolling */}
      <LazyComponent />
    </div>
  );
});

export const LazyComponent = component$(() => {
  // useVisibleTask$ hook will execute the given function when the component becomes visible
  useVisibleTask$(() => {
    alert('LazyComponent is now visible!');
    // Here you can add any logic that should be triggered when the component is visible.
    // For example, fetching data, starting animations, etc.
  });

  return (
    <div>
      <p>If you see this, the LazyComponent has been loaded.</p>
    </div>
  );
});
