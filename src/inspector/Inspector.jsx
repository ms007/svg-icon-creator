import React from 'react';
import styled from 'styled-components';

import { ThemeSwitch } from './components';

const Box = styled.div`
  min-width: 342px;
  height: 100vh;
  background-color: ${(props) => props.theme.inspector.background};
  color: ${(props) => props.theme.inspector.color};
`;

const Switch = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const Inspector = () => {
  return (
    <Box>
      Inspector
      <Switch>
        <ThemeSwitch />
      </Switch>
    </Box>
  );
};

export default Inspector;
