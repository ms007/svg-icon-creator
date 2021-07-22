import React, { useState } from 'react';
import { useKey } from 'react-use';
import { useRecoilCallback, useResetRecoilState } from 'recoil';
import { v4 as uuid } from 'uuid';

import useCanvasItemCreate from 'hooks/useCanvasItemCreate';
import {
  canvasIsCreatingNewItemAtom,
  newCanvasItemTypeAtom,
  canvasItemsAtom,
  canvasItemsAtomFamily,
} from 'recoil/canvas';

const NewCanvasItem = ({ type }) => {
  const [newItem, setNewItem] = useState(null);
  const resetType = useResetRecoilState(newCanvasItemTypeAtom);
  const resetIsCreatingNewItem = useResetRecoilState(canvasIsCreatingNewItemAtom);

  useKey('Escape', () => reset());

  const reset = () => {
    resetType();
    resetIsCreatingNewItem();
  };

  const addNewCanvasItem = useRecoilCallback(({ set }) => (canvasItem) => {
    const id = uuid();
    reset();
    set(canvasItemsAtom, (canvasItems) => [...canvasItems, id]);
    set(canvasItemsAtomFamily(id), canvasItem);
  });

  useCanvasItemCreate(({ status, position }) => {
    if (status === 'start') {
      const x = Math.round(position.x);
      const y = Math.round(position.y);
      setNewItem({
        origin: { x, y },
        x,
        y,
        width: 0,
        height: 0,
      });
    }

    if (status === 'moving') {
      const { x, y } = position;
      const { origin } = newItem;

      const width = x - origin.x;
      const height = y - origin.y;

      const absoluteWidth = Math.abs(width);
      const absoluteHeight = Math.abs(height);

      setNewItem({
        ...newItem,
        x: width < 0 ? origin.x - absoluteWidth : origin.x,
        y: height < 0 ? origin.y - absoluteHeight : origin.y,
        width: absoluteWidth,
        height: absoluteHeight,
      });
    }

    if (status === 'end') {
      addNewCanvasItem({
        type,
        x: Math.round(newItem.x),
        y: Math.round(newItem.y),
        width: Math.round(newItem.width),
        height: Math.round(newItem.height),
      });
    }
  });

  if (newItem == null) {
    return null;
  }

  const { x, y, width, height } = newItem;
  return <rect x={x} y={y} width={width} height={height} />;
};

export default NewCanvasItem;
