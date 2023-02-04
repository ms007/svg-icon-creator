import { selectorFamily } from 'recoil';

import { canvasItemsAtomFamily } from './atom';

const withCanvasItemMaxRadius = selectorFamily({
  key: 'canvas.withCanvasItemMaxRadius',
  get:
    (id) =>
    ({ get }) => {
      if (id == null) {
        return 0;
      }

      const item = get(canvasItemsAtomFamily(id));
      const { width, height } = item;
      const min = Math.min(width, height);
      return min / 2;
    },
});

export default withCanvasItemMaxRadius;
