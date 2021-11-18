import React, { useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import { createShape } from './shapes';
import useCanvasItemMove from 'hooks/useCanvasItemMove';
import {
  canvasIsCreatingNewItemAtom,
  canvasItemsAtomFamily,
  canvasSelectedItemsAtom,
  canvasEditingItemAtom,
  canvasHoveredItemAtom,
} from 'recoil/canvas';

export default function CanvasItem({ id }) {
  const [isMoving, setIsMoving] = useState(false);
  const [itemState, setItemState] = useRecoilState(canvasItemsAtomFamily(id));
  const isCreatingNewCanvasItem = useRecoilValue(canvasIsCreatingNewItemAtom);
  const resetEditing = useResetRecoilState(canvasEditingItemAtom);
  const setSelectedCanvasItems = useSetRecoilState(canvasSelectedItemsAtom);
  const setHoveredCanvasItem = useSetRecoilState(canvasHoveredItemAtom);
  const noop = () => {};

  const { onMouseDown } = useCanvasItemMove(({ status, position }) => {
    if (status === 'start') {
      setSelectedCanvasItems([id]);
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

  const scrollIntoView = (id) => {
    document.getElementById(`l${id}`).scrollIntoView({ behavior: 'smooth' });
  };

  const onClick = (event) => {
    event.stopPropagation();
    setSelectedCanvasItems([id]);
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
