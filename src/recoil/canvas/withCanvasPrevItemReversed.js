import { selector } from 'recoil';

import { canvasEditingItemAtom } from './atom';
import withCanvasItemsReversed from './withCanvasItemsReversed';

const withCanvasPrevItemReversed = selector({
  key: 'withCanvasPrevItemReversed',
  get: ({ get }) => {
    const editingId = get(canvasEditingItemAtom);
    if (editingId == null) {
      return null;
    }

    const canvasItems = get(withCanvasItemsReversed);
    const count = canvasItems.length;
    if (count < 2) {
      return null;
    }

    const index = canvasItems.indexOf(editingId);
    return canvasItems[index === 0 ? count - 1 : index - 1];
  },
});

export default withCanvasPrevItemReversed;
