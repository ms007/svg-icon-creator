import React from 'react';
import styled from 'styled-components';

import ThemeSwitchButton from './ThemeSwitchButton';

const Box = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`;

const ThemeSwitch = () => {
  return (
    <Box>
      <ThemeSwitchButton />
    </Box>
  );
};

export default ThemeSwitch;
