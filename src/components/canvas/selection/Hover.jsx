import React from 'react';
import { useRecoilValue } from 'recoil';

import Border from './Border';
import { withHoveredCanvasItem, withCanvasItemCoordinates } from 'recoil/canvas';

const Hover = () => {
  const hoveredItem = useRecoilValue(withHoveredCanvasItem);
  const coordinates = useRecoilValue(withCanvasItemCoordinates(hoveredItem));

  if (hoveredItem == null) {
    return null;
  }

  return <Border coordinates={coordinates} />;
};

export default Hover;
