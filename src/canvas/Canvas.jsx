import React from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'react-use';

import Artboard from './artboard';

const Box = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.canvas.background};
  color: ${(props) => props.theme.canvas.color};
`;

const Canvas = () => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  // ToDo: do not hardcore sidebar values
  // ToDo: too big on big screens?

  const width = windowWidth - 2 * 342 - 160;
  const height = windowHeight - 160;
  const artboardWidth = width < height ? width : height;
  const minSize = 300;

  return (
    <Box>
      <Artboard width={artboardWidth >= minSize ? artboardWidth : minSize} />
    </Box>
  );
};

export default Canvas;
