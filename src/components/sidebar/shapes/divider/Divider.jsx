import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

const Box = styled.div`
  position: absolute;
  margin-left: -6px;
  width: calc(100% + 6px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: visibility 0.1s ease, opacity 0.1s ease;
  z-index: 1;
`;

const Circle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.sidebar.shapes.divider.background};
`;

const Line = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.sidebar.shapes.divider.background};
`;

const Divider = ({ visible }) => {
  return (
    <Wrapper>
      <Box visible={visible}>
        <Circle />
        <Line />
      </Box>
    </Wrapper>
  );
};

export default Divider;
