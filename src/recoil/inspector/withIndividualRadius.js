import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';

const withIndividualRadius = selector({
  key: 'withIndividualRadius',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return '';
    }

    // ToDo: What if we would like to select more than one item
    const id = selectedCanvasItems[0];
    const { radius } = get(canvasItemsAtomFamily(id));
    if (radius == null) {
      return { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };
    }

    return radius;
  },
  set: ({ get, set }, radius) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    // ToDo: What if we would like to select more than one item
    const id = selectedCanvasItems[0];
    const canvasItem = get(canvasItemsAtomFamily(id));

    const isEmpty = Object.values(radius).every((value) => value <= 0);
    if (isEmpty) {
      const { radius, ...rest } = canvasItem;
      set(canvasItemsAtomFamily(id), rest);
      return;
    }

    set(canvasItemsAtomFamily(id), { ...canvasItem, radius });
  },
});

export default withIndividualRadius;
