import React from 'react';
import { useKey } from 'react-use';
import { useResetRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import presetsAtom from 'recoil/presets';
import { withPixelSize } from 'recoil/artboard';
import {
  canvasSelectedItemAtom,
  withCanvasItemCoordinates,
  canvasItemsAtomFamily,
} from 'recoil/canvas';

import SelectionBoxBorder from './SelectionBoxBorder';
import SelectionBoxResizeHandle from './SelectionBoxResizeHandle';

const SelectionBox = ({ id }) => {
  const presets = useRecoilValue(presetsAtom);
  const sizeOfOnePixel = useRecoilValue(withPixelSize);
  const coordinates = useRecoilValue(withCanvasItemCoordinates(id));
  const setItemState = useSetRecoilState(canvasItemsAtomFamily(id));

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

  const resetSelection = useResetRecoilState(canvasSelectedItemAtom);
  useKey('Escape', resetSelection);

  const gripCoords = {
    nw: [topLeft.x - sizeOfOnePixel * 4.6, topLeft.y - sizeOfOnePixel * 4.6],
    ne: [topRight.x - sizeOfOnePixel * 3.4, topRight.y - sizeOfOnePixel * 4.6],
    sw: [bottomLeft.x - sizeOfOnePixel * 4.6, bottomLeft.y - sizeOfOnePixel * 3.4],
    se: [bottomRight.x - sizeOfOnePixel * 3.4, bottomRight.y - sizeOfOnePixel * 3.4],
    n: [topCenter.x - sizeOfOnePixel * 4, topCenter.y - sizeOfOnePixel * 4.6],
    w: [leftCenter.x - sizeOfOnePixel * 4.6, leftCenter.y - sizeOfOnePixel * 4],
    e: [rightCenter.x - sizeOfOnePixel * 3.4, rightCenter.y - sizeOfOnePixel * 4],
    s: [bottomCenter.x - sizeOfOnePixel * 4, bottomCenter.y - sizeOfOnePixel * 3.4],
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

  const onResizeEnd = () => {
    setItemState((state) => ({
      ...state,
      x: Math.round(state.x),
      y: Math.round(state.y),
      height: Math.max(Math.round(state.height), 1),
      width: Math.max(Math.round(state.width), 1),
    }));
  };

  return (
    <>
      <SelectionBoxBorder id={id} />

      {Object.keys(gripCoords).map((key) => {
        const [x, y] = gripCoords[key];
        return (
          <SelectionBoxResizeHandle
            key={key}
            size={sizeOfOnePixel * 8}
            direction={key}
            x={x}
            y={y}
            strokeWidth={sizeOfOnePixel * 2}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
          />
        );
      })}
    </>
  );
};

export default SelectionBox;
