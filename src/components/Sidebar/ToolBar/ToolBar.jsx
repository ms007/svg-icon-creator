import React from 'react';
import { useSetRecoilState } from 'recoil';

import ToolButton from './ToolButton';
import ToolTitle from './ToolTitle';
import ToolCaption from './ToolCaption';
import Rectangle from './Rectangle';

import { canvasIsCreatingNewItemAtom, newCanvasItemTypeAtom } from 'recoil/canvas';
import {} from 'recoil/canvas/atom';

const Tools = () => {
  const setNewCanvasItemType = useSetRecoilState(newCanvasItemTypeAtom);
  const setIsCreatingNewItem = useSetRecoilState(canvasIsCreatingNewItemAtom);

  const onToolbarButtonClick = (type) => {
    setNewCanvasItemType(type);
    setIsCreatingNewItem(true);
  };

  return (
    <>
      <ToolButton onClick={() => onToolbarButtonClick('rectangle')}>
        <Rectangle />
        <ToolTitle title="Rectangle" />
        <ToolCaption caption="(R)" />
      </ToolButton>
    </>
  );
};

export default Tools;
