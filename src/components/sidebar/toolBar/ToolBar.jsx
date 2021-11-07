import React from 'react';
import { useKey } from 'react-use';
import { useSetRecoilState } from 'recoil';

import ToolButton from './ToolButton';
import ToolTitle from './ToolTitle';
import ToolCaption from './ToolCaption';
import Rectangle from './rectangle';

import { canvasIsCreatingNewItemAtom, newCanvasItemTypeAtom } from 'recoil/canvas';

const Tools = () => {
  const setNewCanvasItemType = useSetRecoilState(newCanvasItemTypeAtom);
  const setIsCreatingNewItem = useSetRecoilState(canvasIsCreatingNewItemAtom);

  useKey('r', () => onToolbarButtonClick('rectangle'));
  useKey('R', () => onToolbarButtonClick('rectangle'));

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
