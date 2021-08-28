import React from 'react';
import styled from 'styled-components';

import useCanvasItemMove from 'hooks/useCanvasItemMove';

const Handle = styled.rect.attrs(({ width, height, strokeWidth }) => ({
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
`;

const SelectionBoxResizeHandle = ({ direction, size, onResize, onResizeEnd, ...props }) => {
  const { onMouseDown } = useCanvasItemMove(({ status, event, position }) => {
    event.stopPropagation();

    if (status === 'moving') {
      onResize(direction, position);
    }

    if (status === 'end') {
      onResizeEnd(direction, position);
    }
  });

  return (
    <Handle width={size} height={size} direction={direction} onMouseDown={onMouseDown} {...props} />
  );
};

export default SelectionBoxResizeHandle;
