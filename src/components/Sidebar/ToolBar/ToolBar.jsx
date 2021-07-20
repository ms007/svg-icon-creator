import React from 'react';
import { useRecoilCallback } from 'recoil';
import { v4 as uuid } from 'uuid';

import ToolButton from './ToolButton';
import ToolTitle from './ToolTitle';
import ToolCaption from './ToolCaption';
import Rectangle from './Rectangle';

import { canvasItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';

const Tools = () => {
  const addNewCanvasItem = useRecoilCallback(({ set }) => (type) => {
    const id = uuid();
    set(canvasItemsAtom, (canvasItems) => [...canvasItems, id]);
    set(canvasItemsAtomFamily(id), { type, x: 0, y: 0 });
  });

  return (
    <>
      <ToolButton onClick={() => addNewCanvasItem('rectangle')}>
        <Rectangle />
        <ToolTitle title="Rectangle" />
        <ToolCaption caption="(R)" />
      </ToolButton>
    </>
  );
};

export default Tools;
