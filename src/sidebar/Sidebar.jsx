import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  min-width: 342px;
  height: 100vh;
  background-color: ${(props) => props.theme.sidebar.background};
  color: ${(props) => props.theme.sidebar.color};
`;

const Sidebar = () => {
  return <Box>Sidebar</Box>;
};

export default Sidebar;
