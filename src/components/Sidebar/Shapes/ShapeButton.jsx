import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  display: flex;
  margin-top: 5px;
  height: 32px;
  align-items: center;
  position: relative;
  color: ${({ selected, hovered, theme }) =>
    selected || hovered ? theme.sidebar.shapes.text.hover : theme.sidebar.shapes.text.default};
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    width: calc(100% + 10px);
    height: calc(100% + 2px);
    border-left: ${({ selected, theme }) =>
      `3px solid ${selected ? theme.sidebar.shapes.shape.border.selected : 'transparent'}`};
    border-radius: 2px;
    background-color: ${({ selected, theme }) =>
      selected ? theme.sidebar.shapes.shape.selected : 'transparent'};
    z-index: -1;
  }

  &:hover {
    cursor: pointer;
  }
`;

const ShapeButton = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});

export default ShapeButton;
