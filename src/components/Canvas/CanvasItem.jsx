import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { createShape } from './Shapes';
import useCanvasItemMove from 'hooks/useCanvasItemMove';
import { canvasIsCreatingNewItemAtom, canvasItemsAtomFamily } from 'recoil/canvas';

export default function CanvasItem({ id }) {
  const [isMoving, setIsMoving] = useState(false);
  const [itemState, setItemState] = useRecoilState(canvasItemsAtomFamily(id));
  const isCreatingNewCanvasItem = useRecoilValue(canvasIsCreatingNewItemAtom);

  const { onMouseDown } = useCanvasItemMove(({ status, position }) => {
    if (status === 'start') {
      setIsMoving(true);
    }

    if (status === 'moving') {
      const { x, y } = position;

      console.log(itemState);

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

  const handleMouseDown = isCreatingNewCanvasItem ? () => {} : onMouseDown;

  const Shape = createShape(itemState);
  if (!Shape) {
    return null;
  }

  return <Shape {...itemState} onMouseDown={handleMouseDown} isMoving={isMoving} />;
}
