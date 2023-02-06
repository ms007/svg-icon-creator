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
      set(inspectorBorderAtomFamily(id), { ...inspectorValues, enabled });

      const canvasItem = get(canvasItemsAtomFamily(id));

      if (enabled) {
        const stroke = canvasItem.stroke || {};
        const { width } = inspectorValues;
        set(canvasItemsAtomFamily(id), { ...canvasItem, stroke: { ...stroke, width } });
      } else {
        const { stroke } = canvasItem;
        if (stroke) {
          // remove the stroke
          const { stroke, ...rest } = canvasItem;
          set(canvasItemsAtomFamily(id), rest);
        }
      }
    });
  },
});

export default withBorderEnabled;
