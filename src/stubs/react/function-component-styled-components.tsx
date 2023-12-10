import styled from "styled-components";

interface ComponentNameProps {}

const Title = styled.div`
  font-size: x-large;
	font-weight: bold;
`;

export default function ComponentName({}: ComponentNameProps) {
	return <Title>Hello ComponentName</Title>;
}
