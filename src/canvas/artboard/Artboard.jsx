import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  margin: 80px;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  background-color: ${(props) => props.theme.artboard.background};
  box-shadow: 0 0 2px 0 #b9bcc0cc;
  border-radius: 2px;
  color: ${(props) => props.theme.artboard.color};
`;

const Artboard = ({ width }) => {
  return <Box width={width}>Artboard</Box>;
};

export default Artboard;
