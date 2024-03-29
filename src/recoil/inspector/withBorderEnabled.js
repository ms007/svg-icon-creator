import { selector } from 'recoil';
import { canvasSelectedItemsAtom, withCanvasItemBorder } from 'recoil/canvas';
import { inspectorBorderAtomFamily } from './atom';

const withBorderEnabled = selector({
  key: 'inspector.withBorderEnabled',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return false;
    }

    return selectedCanvasItems.some((id) => {
      const { enabled } = get(inspectorBorderAtomFamily(id));
      return enabled;
    });
  },
  set: ({ get, set }, enabled) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      const inspectorValues = get(inspectorBorderAtomFamily(id));
      const newInpectorValues = { ...inspectorValues, enabled };
      set(inspectorBorderAtomFamily(id), newInpectorValues);
      set(withCanvasItemBorder, { ...newInpectorValues, id });
    });
  },
});

export default withBorderEnabled;
