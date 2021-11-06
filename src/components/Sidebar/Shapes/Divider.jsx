import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: visibility 0.1s ease, opacity 0.1s ease;
`;

const Line = styled.div`
  display: flex;
  top: 2px;
  height: 2px;
  left: -11px;
  position: absolute;
  align-items: center;
  width: calc(100% + 14px);
  z-index: 1;

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.sidebar.shapes.divider.background};
  }

  &::after {
    content: '';
    width: calc(100% + 12px);
    margin-left: -1px;
    height: 2px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.sidebar.shapes.divider.background};
  }
`;

const Divider = ({ visible }) => {
  return (
    <Box visible={visible}>
      <Line />
    </Box>
  );
};

export default Divider;
