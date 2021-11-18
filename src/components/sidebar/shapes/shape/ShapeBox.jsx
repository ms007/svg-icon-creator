import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  height: 36px;
  margin-left: -3px;
  padding: 4px 10px 4px 4px;
  display: flex;
  align-items: center;
  background-color: ${({ selected, theme }) =>
    selected ? theme.sidebar.shapes.shape.selected : 'transparent'};
  color: ${({ selected, hovered, theme }) =>
    selected || hovered ? theme.sidebar.shapes.text.hover : theme.sidebar.shapes.text.default};
  cursor: ${({ dragging }) => (dragging ? 'grabbing' : 'pointer')};
  border-left: ${({ selected, theme }) =>
    `2px solid ${selected ? theme.sidebar.shapes.shape.border.selected : 'transparent'}`};
  border-radius: 2px;
  z-index: 0;
`;

const ShapeBox = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});

export default ShapeBox;
