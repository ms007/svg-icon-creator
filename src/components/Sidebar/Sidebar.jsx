import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { sideBarState } from '../../state/size.state';

const Box = styled.div`
  min-width: ${(props) => `${props.width}px`};
  height: 100vh;
  background-color: ${(props) => props.theme.sidebar.background};
  color: ${(props) => props.theme.sidebar.color};
`;

const Sidebar = () => {
  const [width] = useRecoilState(sideBarState);

  return <Box width={width}>Sidebar</Box>;
};

export default Sidebar;
