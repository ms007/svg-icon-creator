import React from 'react';
import styled from 'styled-components';

import Artboard from './Artboard';

const Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.canvas.background};
  color: ${(props) => props.theme.canvas.color};
`;

const Canvas = () => {
  return (
    <Box>
      <Artboard />
    </Box>
  );
};

export default Canvas;
