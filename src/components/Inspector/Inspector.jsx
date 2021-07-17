import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import inspectorAtom from 'recoil/inspector';
import ThemeSwitch from './ThemeSwitch';

const Box = styled.div`
  min-width: ${(props) => `${props.width}px`};
  height: 100vh;
  background-color: ${(props) => props.theme.inspector.background};
  color: ${(props) => props.theme.inspector.color};
`;

const Inspector = () => {
  const { width } = useRecoilValue(inspectorAtom);

  return (
    <Box width={width}>
      Inspector
      <ThemeSwitch />
    </Box>
  );
};

export default Inspector;
