import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Artboard from './Artboard';
import CanvasItem from './CanvasItem';
import NewCanvasItem from './NewCanvasItem';

import { newCanvasItemAtom, canvasItemsAtom } from 'recoil/canvas';

const Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.canvas.background};
  color: ${(props) => props.theme.canvas.color};
`;

const Canvas = () => {
  const { visible, type } = useRecoilValue(newCanvasItemAtom);
  const canvasItems = useRecoilValue(canvasItemsAtom);

  return (
    <Box>
      <Artboard>
        {visible && <NewCanvasItem type={type} />}
        {canvasItems.map((item) => {
          return <CanvasItem key={item} id={item} />;
        })}
      </Artboard>
    </Box>
  );
};

export default Canvas;
