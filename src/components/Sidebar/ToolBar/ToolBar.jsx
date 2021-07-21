import React from 'react';
import { useSetRecoilState } from 'recoil';

import ToolButton from './ToolButton';
import ToolTitle from './ToolTitle';
import ToolCaption from './ToolCaption';
import Rectangle from './Rectangle';

import { newCanvasItemAtom } from 'recoil/canvas';

const Tools = () => {
  const addNewCanvasItem = useSetRecoilState(newCanvasItemAtom);

  const onToolbarButtonClick = (type) => {
    addNewCanvasItem({ visible: true, type });
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
