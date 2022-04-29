import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';

const color = theme('mode', {
  light: ({ selected }) => (selected ? 'var(--primary)' : 'var(--neutral50)'),
  dark: ({ selected }) => (selected ? 'var(--neutral50)' : 'var(--neutral30)'),
});

const hover = theme('mode', {
  light: 'var(--primary)',
  dark: 'var(--neutral50)',
});

const Button = styled.button`
  position: relative;
  width: 100%;
  height: 24px;
  border: none;
  padding: 0;
  background: transparent;
  display: flex;
  align-items: center;
  stroke: ${color};
  color: ${color};
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    background-color: 'transparent';
    width: calc(100% + 20px);
    height: 44px;
    left: -10px;
    z-index: -1;
    border-radius: 4px;
  }

  &:hover {
    stroke: ${hover};
    color: ${hover};
    cursor: pointer;
  }

  &:focus-visible {
    outline: none;
  }
`;

const ToolButton = ({ selected, children, onClick }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <Button selected={selected} onClick={handleClick}>
      {children}
    </Button>
  );
};

export default ToolButton;
