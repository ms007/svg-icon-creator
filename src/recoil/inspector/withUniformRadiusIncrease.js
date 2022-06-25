import { selector } from 'recoil';
import {
  canvasSelectedItemsAtom,
  canvasItemsAtomFamily,
  withCanvasItemMaxRadius,
} from 'recoil/canvas';

const withUniformRadiusIncrease = selector({
  key: 'withUniformRadiusIncrease',
  get: () => {},
  set: ({ get, set }, amount) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      const canvasItem = get(canvasItemsAtomFamily(id));
      const { radius } = canvasItem;

      const value = radius ? Object.values(radius)[0] : 0;
      let newValue = value + amount;
      newValue = Math.round(newValue + 'e+1') + 'e-1';

      if (newValue <= 0) {
        const { radius, ...rest } = canvasItem;
        set(canvasItemsAtomFamily(id), rest);
        return;
      }

      const max = get(withCanvasItemMaxRadius(id));
      newValue = Math.min(newValue, max);

      const [topLeft, topRight, bottomLeft, bottomRight] = Array(4).fill(newValue);

      set(canvasItemsAtomFamily(id), {
        ...canvasItem,
        radius: {
          topLeft,
          topRight,
          bottomLeft,
          bottomRight,
        },
      });
    });
  },
});

export default withUniformRadiusIncrease;
