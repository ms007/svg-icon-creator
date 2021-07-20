import React from 'react';
import { useRecoilState } from 'recoil';

import useCanvasItemMove from 'hooks/useCanvasItemMove';
import { canvasItemsAtomFamily } from 'recoil/canvas';

export default function CanvasItem({ id }) {
  const [itemState, setItemState] = useRecoilState(canvasItemsAtomFamily(id));

  const { onMouseDown } = useCanvasItemMove(({ status, position }) => {
    if (status === 'moving') {
      const { x, y } = position;
      setItemState({
        ...itemState,
        x,
        y,
      });
    }
  });

  const { x, y } = itemState;
  const Shape = () => <rect onMouseDown={onMouseDown} x={x} y={y} width="2" height="2" />;

  return <Shape />;
}
