import { component$, useStyles$ } from "@builder.io/qwik";

export default component$(() => {
	// useStyles$ hook to apply styles to your component
	useStyles$(`
    .custom-style {
      color: blue;
      font-size: 20px;
      padding: 10px;
      border: 1px solid black;
      margin: 5px;
    }
  `);

	return (
		<div>
			<p className="custom-style">ComponentName</p>
		</div>
	);
});
