import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

const color = theme('mode', {
  light: ({ selected, hovered }) => (selected || hovered ? 'var(--body)' : 'var(--neutral50)'),
  dark: ({ selected, hovered }) => (selected || hovered ? 'var(--body)' : 'var(--neutral30)'),
});

const backgroundColor = theme('mode', {
  light: ({ selected }) => (selected ? 'var(--neutral20)' : 'transparent'),
  dark: ({ selected }) => (selected ? 'var(--neutral20)' : 'transparent'),
});

const Box = styled.div`
  height: 44px;
  margin-left: -10px;
  width: calc(100% + 20px);
  padding: 4px 10px;
  display: flex;
  align-items: center;
  background-color: ${backgroundColor};
  color: ${color};
  cursor: ${({ dragging }) => (dragging ? 'grabbing' : 'pointer')};
  border-radius: 4px;
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
