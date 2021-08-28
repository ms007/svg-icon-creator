import React from 'react';
import styled from 'styled-components';
import { useRecoilValue, waitForAll } from 'recoil';

import Artboard from './Artboard';
import CanvasItem from './CanvasItem';
import NewCanvasItem from './NewCanvasItem';
import { SelectionBox, SelectionBoxBorder } from './Selection';

import {
  canvasIsCreatingNewItemAtom,
  newCanvasItemTypeAtom,
  canvasItemsAtom,
  canvasSelectedItemAtom,
  canvasHoveredItemAtom,
} from 'recoil/canvas';

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

  const selectedItem = useRecoilValue(canvasSelectedItemAtom);
  const hoveredItem = useRecoilValue(canvasHoveredItemAtom);
  const canvasItems = useRecoilValue(canvasItemsAtom);

  const showSelectionBorder = hoveredItem != null && hoveredItem !== selectedItem;

  return (
    <Box>
      <Artboard>
        {isCreatingNewItem && <NewCanvasItem type={type} />}

        {canvasItems.map((item) => {
          return <CanvasItem key={item} id={item} />;
        })}

        {selectedItem && <SelectionBox id={selectedItem} />}
        {showSelectionBorder && <SelectionBoxBorder id={hoveredItem} />}
      </Artboard>
    </Box>
  );
};

export default Canvas;
