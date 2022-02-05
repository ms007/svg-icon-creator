import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useKey } from 'react-use';

import {
  canvasItemsAtomFamily,
  canvasSelectedItemsAtom,
  canvasEditingItemAtom,
  withCanvasNextItemReversed,
  withCanvasPrevItemReversed,
} from 'recoil/canvas';

const hoverColor = theme('mode', {
  light: `0 0 2px 0 ${'#b9bcc0'}`,
  dark: 'var(--sidebar)',
});

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
  border-radius: 2px;
  user-select: ${({ draggable }) => (draggable ? 'text' : 'auto')};

  &:hover {
    color: ${hoverColor};
    cursor: pointer;
  }

  &:focus {
    background-color: #ffffff;
    cursor: text;
    outline: 2px solid var(--primaryAlpha);
    filter: drop-shadow(0px 0px 3px rgb(86, 90, 102, 0.2));
  }

  &::selection {
    background: var(--primaryBeta);
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
    if (id === editingId) {
      inputRef.current.select();
    }

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

  const onBlur = () => {
    save();
    setEditingId(null);
  };

  return (
    <Box>
      <Text
        draggable
        ref={inputRef}
        value={name}
        onChange={onChange}
        onBlur={onBlur}
        onDragStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    </Box>
  );
};

export default Input;
