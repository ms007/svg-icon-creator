import { selector } from 'recoil';
import { canvasSelectedItemsAtom, withCanvasItemBorder } from 'recoil/canvas';
import { inspectorBorderAtomFamily } from './atom';
import { colord } from 'colord';

const withBorderColor = selector({
  key: 'inspector.withBorderColor',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return '';
    }

    const values = selectedCanvasItems.map((id) => get(inspectorBorderAtomFamily(id)).color);
    return values.every((value) => colord(value).isEqual(values[0])) ? values[0] : 'multi';
  },
  set: ({ get, set }, color) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    const colordColor = colord(color);
    if (!colordColor.isValid()) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      const inspectorValues = get(inspectorBorderAtomFamily(id));
      const newInpectorValues = { ...inspectorValues, color };
      set(inspectorBorderAtomFamily(id), newInpectorValues);
      set(withCanvasItemBorder, { ...newInpectorValues, id });
    });
  },
});

export default withBorderColor;
