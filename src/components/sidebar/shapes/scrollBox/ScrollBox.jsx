import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const Box = styled.div`
  max-height: ${({ top }) => `calc(100vh - ${top}px - 70px)`};
  margin: -10px;
  padding: 10px;
  overflow-y: auto;
`;

const ScrollBox = ({ children }) => {
  const [top, setTop] = useState(0);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setTop(node.getBoundingClientRect().top);
    }
  }, []);

  return (
    <Box ref={measuredRef} top={top}>
      {children}
    </Box>
  );
};

export default ScrollBox;
