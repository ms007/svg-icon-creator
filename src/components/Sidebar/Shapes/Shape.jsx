import React, { useRef } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useKey } from 'react-use';

import { canvasItemsAtomFamily } from 'recoil/canvas';

const Box = styled.div`
  margin-left: 10px;
  max-width: 100%;
`;

const Text = styled.input`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  margin-left: -2px;
  padding-top: 2px;
  padding-bottom: 2px;
  background: none;
  color: ${(props) => props.theme.sidebar.shapes.text};
  border: 1px solid transparent;
  border-radius: 3px;

  &:hover {
    color: ${(props) => props.theme.sidebar.shapes.hover};
    cursor: pointer;
  }

  &:focus {
    background-color: ${(props) => props.theme.sidebar.shapes.input.background};
    color: ${(props) => props.theme.sidebar.shapes.hover};
    outline: none;
    cursor: text;
    filter: ${(props) => `drop-shadow(${props.theme.sidebar.shapes.input.shadow})`};
    border-color: ${(props) => props.theme.sidebar.shapes.input.border};
  }

  &::selection {
    background: ${(props) => props.theme.sidebar.shapes.input.selection};
  }
`;

const Shape = ({ id }) => {
  const [shape, setShape] = useRecoilState(canvasItemsAtomFamily(id));
  const { name } = shape;

  const lastValue = useRef(name);
  const inputRef = useRef(null);

  useKey('Escape', () => inputRef.current.blur());
  useKey('Enter', () => inputRef.current.blur());

  const onChange = (event) => {
    lastValue.current = name.length ? name : lastValue;
    setShape({ ...shape, name: event.target.value });
  };

  const onFocus = (event) => event.target.select();

  const onBlur = () => {
    const value = name.trim().length ? name : lastValue.current;
    setShape({ ...shape, name: value });
  };

  return (
    <Box>
      <Text value={name} onChange={onChange} onBlur={onBlur} onFocus={onFocus} ref={inputRef} />
    </Box>
  );
};

export default Shape;
