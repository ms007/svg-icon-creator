import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Artboard from './Artboard';
import CanvasItem from './CanvasItem';

import { canvasItemsAtom } from 'recoil/canvas';

const Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.canvas.background};
  color: ${(props) => props.theme.canvas.color};
`;

const Canvas = () => {
  const canvasItems = useRecoilValue(canvasItemsAtom);

  return (
    <Box>
      <Artboard>
        {canvasItems.map((item) => {
          return <CanvasItem id={item} />;
        })}
      </Artboard>
    </Box>
  );
};

export default Canvas;
