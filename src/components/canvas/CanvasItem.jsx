import React, { useState } from 'react';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { createShape } from './shapes';
import useCanvasItemMove from 'hooks/useCanvasItemMove';
import useCanvasItemSelect from 'hooks/useCanvasItemSelect';
import useSelectedItemsMove from 'hooks/useSelectedItemsMove';
import {
  canvasIsCreatingNewItemAtom,
  canvasItemsAtomFamily,
  canvasEditingItemAtom,
  canvasHoveredItemAtom,
} from 'recoil/canvas';

export default function CanvasItem({ id }) {
  const [isMoving, setIsMoving] = useState(false);
  const itemState = useRecoilValue(canvasItemsAtomFamily(id));
  const isCreatingNewCanvasItem = useRecoilValue(canvasIsCreatingNewItemAtom);
  const resetEditing = useResetRecoilState(canvasEditingItemAtom);
  const setHoveredCanvasItem = useSetRecoilState(canvasHoveredItemAtom);
  const moveSelectedItems = useSelectedItemsMove(id);
  const selectCanvasItem = useCanvasItemSelect();
  const noop = () => {};

  const { onMouseDown } = useCanvasItemMove(({ status, position, event }) => {
    if (status === 'start') {
      selectCanvasItem(id, { shiftKey: event.shiftKey });
      resetEditing();
      setIsMoving(true);
    }

    if (status === 'moving') {
      moveSelectedItems(position);
    }

    if (status === 'end') {
      // ToDo: make snap to grid configurable
      moveSelectedItems(position, { snapToGrid: true });
      setIsMoving(false);
    }
  });

  const scrollIntoView = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  const onClick = (event) => {
    event.stopPropagation();
    scrollIntoView(id);
    resetEditing();
  };

  const onMouseEnter = () => {
    setHoveredCanvasItem(id);
  };

  const onMouseLeave = () => {
    setHoveredCanvasItem(null);
  };

  const Shape = createShape(itemState);
  if (!Shape) {
    return null;
  }

  return (
    <Shape
      {...itemState}
      onClick={onClick}
      onMouseDown={isCreatingNewCanvasItem ? noop : onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      selectable={!isCreatingNewCanvasItem}
      isMoving={isMoving}
    />
  );
}
