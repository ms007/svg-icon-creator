import React from 'react';
import { useKey } from 'react-use';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { H4 } from 'components/common';
import ToolButton from './ToolButton';
import ToolTitle from './ToolTitle';
import ToolCaption from './ToolCaption';
import Rectangle from './rectangle';

import { canvasIsCreatingNewItemAtom, newCanvasItemTypeAtom } from 'recoil/canvas';

const Tools = () => {
  const [newCanvasItemType, setNewCanvasItemType] = useRecoilState(newCanvasItemTypeAtom);
  const setIsCreatingNewItem = useSetRecoilState(canvasIsCreatingNewItemAtom);

  useKey('r', () => onToolbarButtonClick('rectangle'));
  useKey('R', () => onToolbarButtonClick('rectangle'));

  const onToolbarButtonClick = (type) => {
    setNewCanvasItemType(type);
    setIsCreatingNewItem(true);
  };

  return (
    <>
      <H4>Tools</H4>
      <ToolButton
        selected={newCanvasItemType === 'rectangle'}
        onClick={() => onToolbarButtonClick('rectangle')}
      >
        <Rectangle />
        <ToolTitle title="Rectangle" />
        <ToolCaption caption="(R)" />
      </ToolButton>
    </>
  );
};

export default Tools;
