import { selector } from 'recoil';
import { canvasSelectedItemsAtom, withCanvasItemMaxRadius } from 'recoil/canvas';

const withMaxRadius = selector({
  key: 'inspector.withMaxRadius',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return 0;
    }

    if (selectedCanvasItems.length > 1) {
      return Number.MAX_SAFE_INTEGER;
    }

    const id = selectedCanvasItems[0];
    return get(withCanvasItemMaxRadius(id));
  },
});

export default withMaxRadius;
