import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import useCanvasItemMove from 'hooks/useCanvasItemMove';
import { canvasIsCreatingNewItemAtom, canvasItemsAtomFamily } from 'recoil/canvas';

export default function CanvasItem({ id }) {
  const [itemState, setItemState] = useRecoilState(canvasItemsAtomFamily(id));
  const isCreatingNewCanvasItem = useRecoilValue(canvasIsCreatingNewItemAtom);

  const { onMouseDown } = useCanvasItemMove(({ status, position }) => {
    if (status === 'moving') {
      const { x, y } = position;

      setItemState({
        ...itemState,
        x: Math.round(x),
        y: Math.round(y),
      });
    }
  });

  const handleMouseDown = isCreatingNewCanvasItem ? () => {} : onMouseDown;

  const { x, y, width, height } = itemState;
  const Shape = () => (
    <rect onMouseDown={handleMouseDown} x={x} y={y} width={width} height={height} />
  );

  return <Shape />;
}
