import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';

const withUniformRadius = selector({
  key: 'withUniformRadius',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return '';
    }

    // ToDo: What if we would like to select more than one item
    const id = selectedCanvasItems[0];
    const { radius } = get(canvasItemsAtomFamily(id));
    if (radius == null) {
      return 0;
    }

    const isUniform = new Set(Object.values(radius)).size === 1;
    return isUniform ? Object.values(radius)[0] : '';
  },
  set: ({ get, set }, value) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    // ToDo: What if we would like to select more than one item
    const id = selectedCanvasItems[0];
    const canvasItem = get(canvasItemsAtomFamily(id));

    if (value <= 0) {
      const { radius, ...rest } = canvasItem;
      set(canvasItemsAtomFamily(id), rest);
      return;
    }

    const [topLeft, topRight, bottomLeft, bottomRight] = Array(4).fill(value);
    const radius = { topLeft, topRight, bottomLeft, bottomRight };
    set(canvasItemsAtomFamily(id), { ...canvasItem, radius });
  },
});

export default withUniformRadius;
