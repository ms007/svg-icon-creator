import React from 'react';
import ToolButton from './ToolButton';
import ToolTitle from './ToolTitle';
import ToolCaption from './ToolCaption';
import Rectangle from './Rectangle';

const Tools = () => {
  return (
    <>
      <ToolButton>
        <Rectangle />
        <ToolTitle title="Rectangle" />
        <ToolCaption caption="(R)" />
      </ToolButton>
    </>
  );
};

export default Tools;
