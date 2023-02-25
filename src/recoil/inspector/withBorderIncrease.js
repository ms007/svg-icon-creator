import { selector } from 'recoil';
import { inspectorBorderAtomFamily } from './atom';
import withBorderWidth from './withBorderWidth';
import { canvasSelectedItemsAtom } from 'recoil/canvas';

const withBorderIncrease = selector({
  key: 'inspector.withBorderIncrease',
  get: () => {},
  set: ({ get, set }, amount) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      const inspectorValues = get(inspectorBorderAtomFamily(id));

      const value = inspectorValues.width;

      let newValue = value + amount;
      newValue = Math.round((newValue + Number.EPSILON) * 100) / 100;

      set(withBorderWidth, newValue);
    });
  },
});

export default withBorderIncrease;
