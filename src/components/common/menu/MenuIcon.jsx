import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ hovered }) => (hovered ? 'var(--neutral50)' : 'var(--neutral40)')};
`;

const MenuIcon = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

export default MenuIcon;
