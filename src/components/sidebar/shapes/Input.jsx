import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useKey } from 'react-use';

import {
  canvasItemsAtomFamily,
  canvasSelectedItemsAtom,
  canvasEditingItemAtom,
  withCanvasNextItemReversed,
  withCanvasPrevItemReversed,
} from 'recoil/canvas';

const Box = styled.div`
  margin-left: 10px;
  width: 100%;
`;

const Text = styled.input`
  width: 100%;
  height: 24px;
  display: flex;
  align-items: center;
  margin-left: -2px;
  background: none;
  color: inherit;
  border: 1px solid transparent;
  border-radius: 3px;

  &:hover {
    color: ${(props) => props.theme.sidebar.shapes.text.hover};
    cursor: pointer;
  }

  &:focus {
    background-color: ${(props) => props.theme.sidebar.shapes.input.background};
    color: ${(props) => props.theme.sidebar.shapes.input.text};
    outline: none;
    cursor: text;
    filter: ${(props) => `drop-shadow(${props.theme.sidebar.shapes.input.shadow})`};
    border-color: ${(props) => props.theme.sidebar.shapes.input.border};
  }

  &::selection {
    background: ${(props) => props.theme.sidebar.shapes.input.selection};
  }
`;

const Input = ({ id }) => {
  const [shape, setShape] = useRecoilState(canvasItemsAtomFamily(id));
  const [editingId, setEditingId] = useRecoilState(canvasEditingItemAtom);
  const setSelectedItems = useSetRecoilState(canvasSelectedItemsAtom);
  const nextCanvasItem = useRecoilValue(withCanvasNextItemReversed);
  const prevCanvasItem = useRecoilValue(withCanvasPrevItemReversed);

  const { name } = shape;
  const lastValue = useRef(name);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingId != null && id !== editingId) {
      inputRef.current.focus();
    }
  }, [id, editingId]);

  useKey(
    ({ key }) => key === 'Escape' || key === 'Enter',
    (event) => {
      event.preventDefault();
      inputRef.current?.blur();
    },
    { event: 'keydown' }
  );

  useKey(
    ({ key, shiftKey }) => !shiftKey && key === 'Tab',
    (event) => {
      event.preventDefault();
      if (nextCanvasItem) {
        save();
        setSelectedItems([nextCanvasItem]);
        setEditingId(nextCanvasItem);
      }
    },
    { event: 'keydown' }
  );

  useKey(
    ({ key, shiftKey }) => shiftKey && key === 'Tab',
    (event) => {
      event.preventDefault();
      if (prevCanvasItem) {
        save();
        setSelectedItems([prevCanvasItem]);
        setEditingId(prevCanvasItem);
      }
    },
    { event: 'keydown' }
  );

  const save = () => {
    const value = name.trim().length ? name : lastValue.current;
    setShape({ ...shape, name: value });
  };

  const onChange = (event) => {
    lastValue.current = name.length ? name : lastValue;
    setShape({ ...shape, name: event.target.value });
  };

  const onFocus = (event) => {
    event.target.select();
    setEditingId(id);
  };

  const onBlur = () => {
    save();
    setEditingId(null);
  };

  return (
    <Box>
      <Text value={name} onChange={onChange} onBlur={onBlur} onFocus={onFocus} ref={inputRef} />
    </Box>
  );
};

export default Input;
