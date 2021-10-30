import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';

import sidebarAtom from 'recoil/sidebar';
import ToolBar from './ToolBar';
import Shapes from './Shapes';
import MozaIcon from './MozaIcon';
import { canvasSelectedItemsAtom } from 'recoil/canvas';

const Container = styled.div`
  min-width: ${(props) => `${props.width}px`};
  width: ${(props) => `${props.width}px`};
  height: 100vh;
  background-color: ${(props) => props.theme.sidebar.background};
  color: ${(props) => props.theme.sidebar.color};
`;

const Box = styled.div`
  padding: 20px;
`;

const Icon = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

const Sidebar = () => {
  const { width } = useRecoilValue(sidebarAtom);
  const resetSelection = useResetRecoilState(canvasSelectedItemsAtom);

  const onClick = () => {
    resetSelection();
  };

  return (
    <Container width={width} onClick={onClick}>
      <Box>
        <ToolBar />
      </Box>
      <Box>
        <Shapes />
      </Box>
      <Icon>
        <MozaIcon />
      </Icon>
    </Container>
  );
};

export default Sidebar;
