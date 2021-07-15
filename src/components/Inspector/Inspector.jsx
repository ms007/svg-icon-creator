import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { inspectorState } from 'state/size.state';
import ThemeSwitch from './ThemeSwitch';

const Box = styled.div`
  min-width: ${(props) => `${props.width}px`};
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
  const width = useRecoilValue(inspectorState);

  return (
    <Box width={width}>
      Inspector
      <Switch>
        <ThemeSwitch />
      </Switch>
    </Box>
  );
};

export default Inspector;