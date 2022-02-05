import React from 'react';
import { useKey } from 'react-use';
import { useRecoilState } from 'recoil';

import { H4 } from 'components/common';
import ToolButton from './ToolButton';
import ToolTitle from './ToolTitle';
import ToolCaption from './ToolCaption';
import Rectangle from './rectangle';

import { withNewCanvasItem } from 'recoil/canvas';

const Tools = () => {
  const [newCanvasItem, setNewCanvasItem] = useRecoilState(withNewCanvasItem);

  useKey('r', () => onToolbarButtonClick('rectangle'));
  useKey('R', () => onToolbarButtonClick('rectangle'));

  const onToolbarButtonClick = (type) => {
    setNewCanvasItem(type);
  };

  return (
    <>
      <H4>Tools</H4>
      <ToolButton
        selected={newCanvasItem === 'rectangle'}
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
