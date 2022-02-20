import React from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';

import useCanvasItemMove from 'hooks/useCanvasItemMove';
import { withPixelSize } from 'recoil/artboard';

const Handle = styled.circle.attrs(({ size, strokeWidth }) => ({
  r: size,
  strokeWidth,
}))`
  fill: white;
  pointer-events: all;
  stroke: var(--primary);
  cursor: ${({ direction }) => {
    switch (direction) {
      case 'e':
      case 'w':
        return 'ew-resize';
      case 'n':
      case 's':
        return 'ns-resize';
      case 'ne':
      case 'sw':
        return 'nesw-resize';
      case 'nw':
      case 'se':
        return 'nwse-resize';
      default:
        return 'pointer';
    }
  }};
`;

const SelectionBoxResizeHandle = ({
  direction,
  onResizeStart,
  onResize,
  onResizeEnd,
  ...props
}) => {
  const sizeOfOnePixel = useRecoilValue(withPixelSize);
  const size = sizeOfOnePixel * 4;
  const strokeWidth = sizeOfOnePixel * 2;

  const { onMouseDown } = useCanvasItemMove(({ status, event, position }) => {
    event.stopPropagation();

    if (status === 'start') {
      onResizeStart(direction, position);
    }

    if (status === 'moving') {
      onResize(direction, position);
    }

    if (status === 'end') {
      onResizeEnd(direction, position);
    }
  });

  return (
    <Handle
      size={size}
      direction={direction}
      onMouseDown={onMouseDown}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};

export default SelectionBoxResizeHandle;
