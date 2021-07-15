import React from 'react';
import styled from 'styled-components';

import { useTheme } from 'style';

const Button = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  padding: 0;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  fill: ${(props) => props.theme.sidebar.switch.fill};

  &:hover {
    fill: ${(props) => props.theme.sidebar.switch.hover};
    cursor: pointer;
  }
`;

const ThemeSwitch = () => {
  const { toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      <svg height="20" width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M17.66 7.93L12 2.27 6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31A7.98 7.98 0 0012 21.58c2.05 0 4.1-.78 5.66-2.34 3.12-3.12 3.12-8.19 0-11.31zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z" />
      </svg>
    </Button>
  );
};

export default ThemeSwitch;