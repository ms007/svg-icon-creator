import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Border from './Border';
import ResizeHandle from './ResizeHandle';
import {
  withSelectionCoordinates,
  withSelectionGripCoords,
  canvasIsResizingItemAtom,
} from 'recoil/canvas';
import useSelectedItemsResize from 'hooks/useSelectedItemsResize';

const Selection = () => {
  const coordinates = useRecoilValue(withSelectionCoordinates);
  const gripCoords = useRecoilValue(withSelectionGripCoords);
  const setIsResizing = useSetRecoilState(canvasIsResizingItemAtom);
  const resize = useSelectedItemsResize();

  if (coordinates == null) {
    return null;
  }

  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResize = (direction, position) => {
    resize(direction, position, coordinates);
  };

  const onResizeEnd = (direction, position) => {
    // ToDo: Make snap to grid configurable
    const options = { snapToGrid: true };
    resize(direction, position, coordinates, options);
    setTimeout(() => setIsResizing(false), 0);
  };

  return (
    <>
      <Border coordinates={coordinates} />

      {Object.keys(gripCoords).map((key) => {
        const [x, y] = gripCoords[key];
        return (
          <ResizeHandle
            key={key}
            direction={key}
            cx={x}
            cy={y}
            onResize={onResize}
            onResizeEnd={onResizeEnd}
            onResizeStart={onResizeStart}
          />
        );
      })}
    </>
  );
};

export default Selection;
