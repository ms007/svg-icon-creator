import React from 'react';
import { useRecoilValue } from 'recoil';

import { canvasItemsAtomFamily } from 'recoil/canvas';

const Rectangle = ({ name, type, ...props }) => {
  return <rect fill="currentColor" {...props} />;
};

const shapes = {
  rectangle: Rectangle,
};

const IconShape = ({ id }) => {
  const shape = useRecoilValue(canvasItemsAtomFamily(id));

  const { type } = shape;
  if (type == null) {
    return;
  }

  const Shape = shapes[type];
  return <Shape {...shape} />;
};

export default IconShape;
