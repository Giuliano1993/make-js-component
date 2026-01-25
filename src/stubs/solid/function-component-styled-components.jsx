import { createSignal } from "solid-js";
import styled from "solid-styled-components";

const Title = styled.div`
	font-size: x-large;
	font-weight: bold;
`;

export default function ComponentName() {
	const [count, setCount] = createSignal(0);

	return (
		<Title>
			<button onClick={() => setCount(count() + 1)}>
				Hello ComponentName: {count()}
			</button>
		</Title>
	);
}