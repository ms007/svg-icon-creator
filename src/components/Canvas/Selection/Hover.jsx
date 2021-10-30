import React from 'react';
import { useRecoilValue } from 'recoil';

import Border from './Border';
import { withHoveredCanvasItem } from 'recoil/canvas';

const Hover = () => {
  const hoveredItem = useRecoilValue(withHoveredCanvasItem);
  if (hoveredItem == null) {
    return null;
  }

  return <Border id={hoveredItem} />;
};

export default Hover;
