import React, { Fragment } from 'react';
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
  canvasSelectedItemsAtom,
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

  const selectedItems = useRecoilValue(canvasSelectedItemsAtom);
  const hoveredItem = useRecoilValue(canvasHoveredItemAtom);
  const canvasItems = useRecoilValue(canvasItemsAtom);

  const isSelectedItem = (id) => selectedItems.some((selectedItem) => selectedItem === id);
  const showBorderOnHovered = (id) => hoveredItem != null && !isSelectedItem(id);

  return (
    <Box>
      <Artboard>
        {isCreatingNewItem && <NewCanvasItem type={type} />}

        {canvasItems.map((id) => {
          return (
            <Fragment key={id}>
              <CanvasItem id={id} />
              {isSelectedItem(id) && <SelectionBox id={id} />}
              {showBorderOnHovered(hoveredItem) && <SelectionBoxBorder id={hoveredItem} />}
            </Fragment>
          );
        })}
      </Artboard>
    </Box>
  );
};

export default Canvas;
