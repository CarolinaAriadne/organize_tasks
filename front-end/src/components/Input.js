import styled from "styled-components";

export default function Input({ type }) {
  return <StyledInput type={type}></StyledInput>;
}

const StyledInput = styled.input`
  display: flex;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 110%;
  height: 3rem;
  padding: 1rem;
  border: none;
  outline: none;
`;
