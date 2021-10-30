import React, { useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import Preview from './Preview';
import Input from './Input';
import Text from './Text';
import { canvasSelectedItemsAtom, withHoveredCanvasItem } from 'recoil/canvas';

const Button = styled.div`
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
    border-left: ${({ selected, hovered, theme }) =>
      `3px solid ${
        selected
          ? theme.sidebar.shapes.shape.border.selected
          : hovered
          ? theme.sidebar.shapes.shape.border.hover
          : 'transparent'
      }`};
    border-radius: 2px;
    background-color: ${({ selected, hovered, theme }) =>
      selected
        ? theme.sidebar.shapes.shape.selected
        : hovered
        ? theme.sidebar.shapes.shape.hover
        : 'transparent'};
    z-index: -1;
  }

  &:hover {
    color: ${({ theme }) => theme.sidebar.shapes.text.hover};
    cursor: pointer;
  }

  &:hover::before {
    border-left-color: ${(props) =>
      props.selected
        ? props.theme.sidebar.shapes.shape.border.selected
        : props.theme.sidebar.shapes.shape.border.hover};
    background-color: ${(props) =>
      props.selected
        ? props.theme.sidebar.shapes.shape.selected
        : props.theme.sidebar.shapes.shape.hover};
    cursor: pointer;
  }
`;

const Shape = ({ id }) => {
  const ref = useRef(null);
  const [selectedCanvasItem, setSelectedCanvasItem] = useRecoilState(canvasSelectedItemsAtom);
  const [hoveredCanvasItem, setHoveredCanvasItem] = useRecoilState(withHoveredCanvasItem);

  const isSelected = selectedCanvasItem.some((selectedId) => selectedId === id);
  const isHovered = hoveredCanvasItem === id;

  const onClick = (event) => {
    event.stopPropagation();
    setSelectedCanvasItem([id]);
  };

  const onMouseEnter = () => setHoveredCanvasItem(id);
  const onMouseLeave = () => setHoveredCanvasItem(null);

  return (
    <Button
      ref={ref}
      key={id}
      onClick={onClick}
      selected={isSelected}
      hovered={isHovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Preview id={id} />
      {isSelected ? <Input id={id} /> : <Text id={id} />}
    </Button>
  );
};

export default Shape;
