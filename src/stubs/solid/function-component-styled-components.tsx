import { Component, createSignal } from "solid-js";
import styled from "solid-styled-components";

interface ComponentNameProps {}

const Title = styled.div`
	font-size: x-large;
	font-weight: bold;
`;

const ComponentName: Component<ComponentNameProps> = (props) => {
	const [count, setCount] = createSignal(0);

	return (
		<Title>
			<button onClick={() => setCount(count() + 1)}>
				Hello ComponentName: {count()}
			</button>
		</Title>
	);
};

export default ComponentName;