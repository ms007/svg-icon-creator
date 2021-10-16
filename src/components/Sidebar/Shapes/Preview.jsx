import React from 'react';
import { useRecoilValue } from 'recoil';

import { Rectangle } from './Previews';
import { canvasItemsAtomFamily } from 'recoil/canvas';

const Preview = ({ id }) => {
  const shape = useRecoilValue(canvasItemsAtomFamily(id));
  const { type } = shape;

  if (type === 'rectangle') {
    return <Rectangle {...shape} size={10} />;
  }

  return null;
};

export default Preview;
