import React from 'react';
import { useKey } from 'react-use';
import { useResetRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import presetsAtom from 'recoil/presets';
import {
  canvasSelectedItemsAtom,
  withCanvasItemCoordinates,
  canvasItemsAtomFamily,
  canvasIsResizingItemAtom,
} from 'recoil/canvas';

import SelectionBoxBorder from './SelectionBoxBorder';
import SelectionBoxResizeHandle from './SelectionBoxResizeHandle';

const SelectionBox = ({ id }) => {
  const presets = useRecoilValue(presetsAtom);
  const coordinates = useRecoilValue(withCanvasItemCoordinates(id));
  const setItemState = useSetRecoilState(canvasItemsAtomFamily(id));
  const setIsResizing = useSetRecoilState(canvasIsResizingItemAtom);

  const {
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
    topCenter,
    bottomCenter,
    leftCenter,
    rightCenter,
  } = coordinates;

  const resetSelection = useResetRecoilState(canvasSelectedItemsAtom);
  useKey('Escape', resetSelection);

  const gripCoords = {
    nw: [topLeft.x, topLeft.y],
    ne: [topRight.x, topRight.y],
    sw: [bottomLeft.x, bottomLeft.y],
    se: [bottomRight.x, bottomRight.y],
    n: [topCenter.x, topCenter.y],
    w: [leftCenter.x, leftCenter.y],
    e: [rightCenter.x, rightCenter.y],
    s: [bottomCenter.x, bottomCenter.y],
  };

  const onResize = (direction, position) => {
    const { x, y } = position;

    switch (direction) {
      case 'n':
        if (y >= 0 && y <= bottomCenter.y) {
          const height = bottomCenter.y - y;
          setItemState((state) => ({ ...state, y, height }));
        }
        break;

      case 's':
        if (y > topCenter.y && y <= presets.iconSize) {
          const height = y - topCenter.y;
          setItemState((state) => ({ ...state, height }));
        }
        break;

      case 'e':
        if (x > leftCenter.x && x <= presets.iconSize) {
          const width = x - leftCenter.x;
          setItemState((state) => ({ ...state, width }));
        }
        break;

      case 'w':
        if (x < rightCenter.x && x >= 0) {
          const width = rightCenter.x - x;
          setItemState((state) => ({ ...state, x, width }));
        }
        break;

      case 'ne':
        if (x > leftCenter.x && x <= presets.iconSize && y >= 0 && y <= bottomCenter.y) {
          const height = bottomCenter.y - y;
          const width = x - leftCenter.x;
          setItemState((state) => ({ ...state, y, height, width }));
        }
        break;

      case 'se':
        if (y > topCenter.y && y <= presets.iconSize && x > leftCenter.x && x <= presets.iconSize) {
          const height = y - topCenter.y;
          const width = x - leftCenter.x;
          setItemState((state) => ({ ...state, width, height }));
        }
        break;

      case 'sw':
        if (x >= 0 && x < rightCenter.x && y <= presets.iconSize && y > topCenter.y) {
          const height = y - topCenter.y;
          const width = rightCenter.x - x;
          setItemState((state) => ({ ...state, x, width, height }));
        }
        break;

      case 'nw':
        if (x >= 0 && x < rightCenter.x && y >= 0 && y < bottomCenter.y) {
          const height = bottomCenter.y - y;
          const width = rightCenter.x - x;
          setItemState((state) => ({ ...state, x, y, width, height }));
        }
        break;

      default:
    }
  };

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResizeEnd = () => {
    setItemState((state) => ({
      ...state,
      x: Math.round(state.x),
      y: Math.round(state.y),
      height: Math.max(Math.round(state.height), 1),
      width: Math.max(Math.round(state.width), 1),
    }));

    setTimeout(() => setIsResizing(false), 0);
  };

  return (
    <>
      <SelectionBoxBorder id={id} />

      {Object.keys(gripCoords).map((key) => {
        const [x, y] = gripCoords[key];
        return (
          <SelectionBoxResizeHandle
            key={key}
            direction={key}
            x={x}
            y={y}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
            onResizeStart={onResizeStart}
          />
        );
      })}
    </>
  );
};

export default SelectionBox;
