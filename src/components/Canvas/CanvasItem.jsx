import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { createShape } from './Shapes';
import useCanvasItemMove from 'hooks/useCanvasItemMove';
import {
  canvasIsCreatingNewItemAtom,
  canvasItemsAtomFamily,
  canvasSelectedItemAtom,
  canvasEditingItemAtom,
  canvasHoveredItemAtom,
} from 'recoil/canvas';

export default function CanvasItem({ id }) {
  const [isMoving, setIsMoving] = useState(false);
  const [itemState, setItemState] = useRecoilState(canvasItemsAtomFamily(id));
  const isCreatingNewCanvasItem = useRecoilValue(canvasIsCreatingNewItemAtom);
  const resetEditing = useResetRecoilState(canvasEditingItemAtom);
  const setSelectedCanvasItem = useSetRecoilState(canvasSelectedItemAtom);
  const setHoveredCanvasItem = useSetRecoilState(canvasHoveredItemAtom);
  const noop = () => {};

  const { onMouseDown } = useCanvasItemMove(({ status, position }) => {
    if (status === 'start') {
      setSelectedCanvasItem(id);
      resetEditing();
      setIsMoving(true);
    }

    if (status === 'moving') {
      const { x, y } = position;
      setItemState({
        ...itemState,
        x: Math.round(x),
        y: Math.round(y),
      });
    }

    if (status === 'end') {
      setIsMoving(false);
    }
  });

  const onClick = (event) => {
    event.stopPropagation();
    setSelectedCanvasItem(id);
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
