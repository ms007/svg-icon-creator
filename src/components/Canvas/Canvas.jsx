import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { artboardState } from 'state/size.state';
import Artboard from './Artboard';

const Box = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.canvas.background};
  color: ${(props) => props.theme.canvas.color};
`;

const Canvas = () => {
  const { width, margin } = useRecoilValue(artboardState);

  return (
    <Box>
      <Artboard width={width} margin={margin} />
    </Box>
  );
};

export default Canvas;
