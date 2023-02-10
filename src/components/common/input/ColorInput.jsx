import styled from 'styled-components';

const ColorInput = styled.button`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 0;
`;

export default ColorInput;
