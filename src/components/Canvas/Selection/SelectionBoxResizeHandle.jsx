import React from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';

import useCanvasItemMove from 'hooks/useCanvasItemMove';
import { withPixelSize } from 'recoil/artboard';

const Handle = styled.rect.attrs(({ width, height, pixel, strokeWidth }) => ({
  width,
  height,
  fill: 'red',
  stroke: 'rgba(0,0,0,0)',
  strokeWidth,
}))`
  pointer-events: all;
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
  transform: ${({ direction, pixel }) => {
    let x, y;
    switch (direction) {
      case 'nw':
        x = -4.6;
        y = -4.6;
        break;
      case 'ne':
        x = -3.4;
        y = -4.6;
        break;
      case 'sw':
        x = -4.6;
        y = -3.4;
        break;
      case 'se':
        x = -3.4;
        y = -3.4;
        break;
      case 'n':
        x = -4;
        y = -4.6;
        break;
      case 'w':
        x = -4.6;
        y = -4;
        break;
      case 'e':
        x = -3.4;
        y = -4;
        break;
      case 's':
        x = -4;
        y = -3.4;
        break;
      default:
        break;
    }
    return `translate(${pixel * x}px,${pixel * y}px)`;
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
  const size = sizeOfOnePixel * 8;
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
      width={size}
      height={size}
      direction={direction}
      onMouseDown={onMouseDown}
      strokeWidth={strokeWidth}
      pixel={sizeOfOnePixel}
      {...props}
    />
  );
};

export default SelectionBoxResizeHandle;
