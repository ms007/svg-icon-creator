import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';

const withMaxRadius = selector({
  key: 'withMaxRadius',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return 0;
    }

    // ToDo: What if we would like to select more than one item
    const id = selectedCanvasItems[0];
    const item = get(canvasItemsAtomFamily(id));
    const { width, height } = item;
    const min = Math.min(width, height);
    return min / 2;
  },
});

export default withMaxRadius;
