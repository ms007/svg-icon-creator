import React from 'react';
import styled from 'styled-components';

import { MenuItem, MenuIcon, Drop } from 'components/common';
import { useTheme } from 'style';

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const ThemeSwitchMenuItem = (props) => {
  const { theme, toggleTheme } = useTheme();
  const text = `Activate ${theme === 'light' ? 'dark' : 'light'} mode`;

  return (
    <MenuItem onClick={toggleTheme} {...props}>
      {({ hover }) => (
        <Box>
          <MenuIcon hovered={hover}>
            <Drop />
          </MenuIcon>
          {text}
        </Box>
      )}
    </MenuItem>
  );
};

export default ThemeSwitchMenuItem;
