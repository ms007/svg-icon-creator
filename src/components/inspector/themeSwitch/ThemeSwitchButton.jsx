import React from 'react';
import styled from 'styled-components';

import { useTheme } from 'style';

import { Drop } from 'components/common';

const Button = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  padding: 0;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neutralGamma);

  &:hover {
    color: var(--neutralDelta);
    cursor: pointer;
  }
`;

const ThemeSwitch = () => {
  const { toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      <Drop />
    </Button>
  );
};

export default ThemeSwitch;
