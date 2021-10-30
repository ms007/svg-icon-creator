import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Artboard from './Artboard';
import CanvasItem from './CanvasItem';
import NewCanvasItem from './NewCanvasItem';
import { Hover, Selection } from './Selection';

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
  const isCreatingNewItem = useRecoilValue(canvasIsCreatingNewItemAtom);
  const type = useRecoilValue(newCanvasItemTypeAtom);
  const canvasItems = useRecoilValue(canvasItemsAtom);

  return (
    <Box>
      <Artboard>
        {isCreatingNewItem && <NewCanvasItem type={type} />}

        {canvasItems.map((id) => (
          <CanvasItem key={id} id={id} />
        ))}

        <Hover />
        <Selection />
      </Artboard>
    </Box>
  );
};

export default Canvas;
