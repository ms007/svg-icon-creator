import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 24px;
  border: none;
  padding: 0;
  background: none;
  display: flex;
  align-items: center;
  stroke: ${(props) => props.theme.sidebar.tools.stroke};
  color: ${(props) => props.theme.sidebar.tools.text};

  &:hover {
    stroke: ${(props) => props.theme.sidebar.tools.hover};
    color: ${(props) => props.theme.sidebar.tools.hover};
    cursor: pointer;
  }
`;

const ToolButton = ({ children, onClick }) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default ToolButton;
