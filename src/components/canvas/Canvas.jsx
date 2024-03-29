import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import Artboard from './artboard';
import CanvasItem from './CanvasItem';
import NewCanvasItem from './NewCanvasItem';
import { Hover, Selection } from './selection';
import useCanvasItemDelete from 'hooks/useCanvasItemDelete';

import { canvasIsCreatingNewItemAtom, canvasNewItemTypeAtom, canvasItemsAtom } from 'recoil/canvas';

const Box = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--canvas);
`;

const Canvas = () => {
  useCanvasItemDelete();
  const isCreatingNewItem = useRecoilValue(canvasIsCreatingNewItemAtom);
  const type = useRecoilValue(canvasNewItemTypeAtom);
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
