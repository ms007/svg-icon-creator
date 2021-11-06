import { selector } from 'recoil';

import { canvasItemsAtom } from './atom';

const withCanvasItemsReversed = selector({
  key: 'withCanvasItemsReversed',
  get: ({ get }) => {
    const canvasItems = get(canvasItemsAtom);
    return [...canvasItems].reverse();
  },
  set: ({ set }, items) => set(canvasItemsAtom, [...items].reverse()),
});

export default withCanvasItemsReversed;
