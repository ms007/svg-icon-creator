import React from 'react';
import styled from 'styled-components';

import { MenuItem, MenuIcon, Drop } from 'components/common';
import { useTheme } from 'style';

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Switch = ({ highlighted, text }) => {
  return (
    <Box>
      <MenuIcon hovered={highlighted}>
        <Drop />
      </MenuIcon>
      {text}
    </Box>
  );
};

const ThemeSwitchMenuItem = () => {
  const { theme, toggleTheme } = useTheme();
  const text = `Activate ${theme === 'light' ? 'dark' : 'light'} mode`;

  return (
    <MenuItem onSelect={toggleTheme}>
      <Switch text={text} />
    </MenuItem>
  );
};

export default ThemeSwitchMenuItem;
