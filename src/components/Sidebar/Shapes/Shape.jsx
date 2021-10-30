import React, { useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';

import Preview from './Preview';
import Input from './Input';
import Text from './Text';
import { canvasSelectedItemsAtom, canvasHoveredItemAtom } from 'recoil/canvas';

const Button = styled.div`
  display: flex;
  margin-top: 5px;
  height: 32px;
  align-items: center;
  position: relative;
  color: ${(props) =>
    props.selected
      ? props.theme.sidebar.shapes.text.hover
      : props.theme.sidebar.shapes.text.default};
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    left: -10px;
    width: calc(100% + 10px);
    height: calc(100% + 2px);
    border-left: ${(props) =>
      `3px solid ${
        props.selected ? props.theme.sidebar.shapes.shape.border.selected : 'transparent'
      }`};
    border-radius: 2px;
    background-color: ${(props) =>
      props.selected ? props.theme.sidebar.shapes.shape.selected : 'transparent'};
    z-index: -1;
  }

  &:hover {
    color: ${(props) => props.theme.sidebar.shapes.text.hover};
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
  const setHoveredCanvasItem = useSetRecoilState(canvasHoveredItemAtom);

  const isSelected = selectedCanvasItem.some((selectedId) => selectedId === id);

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
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Preview id={id} />
      {isSelected ? <Input id={id} /> : <Text id={id} />}
    </Button>
  );
};

export default Shape;
