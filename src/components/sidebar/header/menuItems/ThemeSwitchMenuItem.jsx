import React from 'react';
import styled from 'styled-components';

import { MenuItem, applyStatics } from 'components/common';
import ThemeSwitchButton from './ThemeSwitchButton';
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
          <ThemeSwitchButton hovered={hover} />
          {text}
        </Box>
      )}
    </MenuItem>
  );
};

applyStatics(MenuItem)(ThemeSwitchMenuItem);

export default ThemeSwitchMenuItem;
