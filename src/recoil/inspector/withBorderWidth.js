import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';
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
      if (!inspectorValues.enabled) {
        return;
      }

      // persists the inspector state
      set(inspectorBorderAtomFamily(id), { ...inspectorValues, width });

      // persists the canvas item state
      const canvasItem = get(canvasItemsAtomFamily(id));
      if (width > 0) {
        const stroke = canvasItem.stroke || {};
        set(canvasItemsAtomFamily(id), { ...canvasItem, stroke: { ...stroke, width } });
      } else {
        const { stroke, ...rest } = canvasItem;
        set(canvasItemsAtomFamily(id), rest);
      }
    });
  },
});

export default withBorderWidth;
