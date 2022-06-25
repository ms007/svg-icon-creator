import { selector } from 'recoil';
import {
  canvasSelectedItemsAtom,
  canvasItemsAtomFamily,
  withCanvasItemMaxRadius,
} from 'recoil/canvas';

const defaultIndividualRadius = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };

const withIndividualRadiusIncrease = selector({
  key: 'withIndividualRadiusIncrease',
  get: () => {},
  set: ({ get, set }, { name, amount }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      const canvasItem = get(canvasItemsAtomFamily(id));
      const radius = { ...(canvasItem.radius || defaultIndividualRadius) };

      const value = radius[name];
      let newValue = value + amount;
      newValue = Math.round(newValue + 'e+1') + 'e-1';

      const max = get(withCanvasItemMaxRadius(id));
      newValue = Math.min(newValue, max);
      if (newValue < 0) {
        newValue = 0;
      }

      radius[name] = newValue;

      const isEmpty = Object.values(radius).every((value) => value <= 0);
      if (isEmpty) {
        const { radius, ...rest } = canvasItem;
        set(canvasItemsAtomFamily(id), rest);
        return;
      }

      set(canvasItemsAtomFamily(id), { ...canvasItem, radius });
    });
  },
});

export default withIndividualRadiusIncrease;
