import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import sidebarAtom from 'recoil/sidebar';
import ToolBar from './ToolBar';

const Box = styled.div`
  min-width: ${(props) => `${props.width}px`};
  height: 100vh;
  background-color: ${(props) => props.theme.sidebar.background};
  color: ${(props) => props.theme.sidebar.color};
  padding: 20px;
`;

const Sidebar = () => {
  const { width } = useRecoilValue(sidebarAtom);

  return (
    <Box width={width}>
      <ToolBar />
    </Box>
  );
};

export default Sidebar;
