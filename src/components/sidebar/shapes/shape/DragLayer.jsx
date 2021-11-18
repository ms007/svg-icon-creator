import React from 'react';
import styled from 'styled-components';
import { useDragLayer } from 'react-dnd';

import Text from './Text';
import Preview from './preview';

const Wrapper = styled.div`
  position: fixed;
  pointer-events: none;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const Box = styled.div`
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  height: 32px;
  align-items: center;
  color: ${({ theme }) => theme.sidebar.shapes.text.hover};
`;

const DragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  const { id } = item;
  const transform = `translate(${currentOffset?.x || 0}px, ${currentOffset?.y || 0}px)`;

  return (
    <Wrapper>
      <Box visible={currentOffset != null} style={{ transform }}>
        <Preview id={id} />
        <Text id={id} />
      </Box>
    </Wrapper>
  );
};

export default DragLayer;
