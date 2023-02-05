import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';
import { inspectorBorderAtomFamily } from './atom';

const withBorderEnabled = selector({
  key: 'inspector.withBorderEnabled',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return false;
    }

    return selectedCanvasItems.some((id) => get(inspectorBorderAtomFamily(id)));
  },
  set: ({ get, set }, enabled) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      set(inspectorBorderAtomFamily(id), enabled);

      const item = get(canvasItemsAtomFamily(id));
      const { stroke } = item;
      if (stroke && !enabled) {
        // remove the stroke
        const canvasItem = Object.keys()
          .filter((key) => key !== 'stroke')
          .reduce((cur, key) => {
            return Object.assign(cur, { [key]: item[key] });
          }, {});

        set(canvasItemsAtomFamily(id), canvasItem);
      }
    });
  },
});

export default withBorderEnabled;
