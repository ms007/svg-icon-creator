import React from 'react';
import { useRecoilValue } from 'recoil';

import { canvasItemsAtomFamily } from 'recoil/canvas';

export default function CanvasItem({ id }) {
  const state = useRecoilValue(canvasItemsAtomFamily(id));
  console.log(state);

  const Shape = () => <rect x="2" y="2" width="2" height="2" />;

  return <Shape />;
}
