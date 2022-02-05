import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

const color = theme('mode', {
  light: ({ selected, hovered }) => (selected || hovered ? 'var(--body)' : 'var(--neutralDelta)'),
  dark: ({ selected, hovered }) =>
    selected ? 'var(--sidebar)' : hovered ? 'var(--body)' : 'var(--neutralBeta)',
});

const backgroundColor = theme('mode', {
  light: ({ selected }) => (selected ? 'var(--neutralAlpha)' : 'transparent'),
  dark: ({ selected }) => (selected ? 'var(--neutralGamma)' : 'transparent'),
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
