import React from 'react';
import styled from 'styled-components';

import { More } from '../icons';

const Button = styled.button`
  display: flex;
  height: 28px;
  background: none;
  color: inherit;
  border: none;
  padding: 0px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  border-radius: 3px;
  background-color: ${({ active }) => (active ? 'var(--neutralAlpha)' : 'none')};

  &:hover {
    background-color: var(--neutralAlpha);
  }
`;

const MoreButton = React.forwardRef((props, ref) => (
  <Button ref={ref} {...props}>
    <More height={28} />
  </Button>
));

export default MoreButton;
