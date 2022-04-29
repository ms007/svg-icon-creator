import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  background: none;
  color: inherit;
  border: none;
  padding: 0px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 3px;
  background-color: ${({ active }) => (active ? 'var(--neutral10)' : 'none')};

  &:hover {
    background-color: var(--neutral10);
  }
`;

const ToggleButton = React.forwardRef(({ children, ...props }, ref) => (
  <Button ref={ref} {...props}>
    {children}
  </Button>
));

export default ToggleButton;
