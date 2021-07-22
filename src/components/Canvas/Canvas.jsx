import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, waitForAll } from 'recoil';

import Artboard from './Artboard';
import CanvasItem from './CanvasItem';
import NewCanvasItem from './NewCanvasItem';

import { canvasIsCreatingNewItemAtom, newCanvasItemTypeAtom, canvasItemsAtom } from 'recoil/canvas';

const Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.canvas.background};
  color: ${(props) => props.theme.canvas.color};
`;

const Canvas = () => {
  const [isCreatingNewItem, type] = useRecoilValue(
    waitForAll([canvasIsCreatingNewItemAtom, newCanvasItemTypeAtom])
  );

  const canvasItems = useRecoilValue(canvasItemsAtom);

  return (
    <Box>
      <Artboard>
        {isCreatingNewItem && <NewCanvasItem type={type} />}

        {canvasItems.map((item) => {
          return <CanvasItem key={item} id={item} />;
        })}
      </Artboard>
    </Box>
  );
};

export default Canvas;
