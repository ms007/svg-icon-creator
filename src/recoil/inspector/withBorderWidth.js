import { selector } from 'recoil';
import { canvasSelectedItemsAtom, withCanvasItemBorder } from 'recoil/canvas';
import { inspectorBorderAtomFamily } from './atom';

const withBorderWidth = selector({
  key: 'inspector.withBorderWidth',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return '';
    }

    const values = selectedCanvasItems.map((id) => get(inspectorBorderAtomFamily(id)).width);
    return values.every((value) => value === values[0]) ? values[0] : 'multi';
  },
  set: ({ get, set }, width) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    width = width < 0 ? 0 : width;

    selectedCanvasItems.forEach((id) => {
      const inspectorValues = get(inspectorBorderAtomFamily(id));
      const newInpectorValues = { ...inspectorValues, width };
      set(inspectorBorderAtomFamily(id), newInpectorValues);
      set(withCanvasItemBorder, { ...newInpectorValues, id });
    });
  },
});

export default withBorderWidth;
