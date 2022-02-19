import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  min-width: ${(props) => `${props.width}px`};
  height: 100vh;
  color: var(--color);
  background-color: var(--sidebar);
`;

const SidePanel = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Box ref={ref} {...props}>
      {children}
    </Box>
  );
});

export default SidePanel;
