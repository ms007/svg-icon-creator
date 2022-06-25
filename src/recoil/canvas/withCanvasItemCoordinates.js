import { selectorFamily } from 'recoil';

import { canvasItemsAtomFamily } from './atom';
import getCoordinates from './helper/coordinatesHelper';

const withCanvasItemCoordinates = selectorFamily({
  key: 'withCanvasItemCoordinates',
  get: (id) => ({ get }) => {
    if (id == null) {
      return {};
    }

    const canvasItem = get(canvasItemsAtomFamily(id));
    const { x, y, width, height } = canvasItem;

    return getCoordinates(x, y, width, height);
  },
});

export default withCanvasItemCoordinates;
