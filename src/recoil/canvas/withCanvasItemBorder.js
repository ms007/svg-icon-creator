import { selector } from 'recoil';
import { colord } from 'colord';

import { canvasItemsAtomFamily } from './atom';

const withCanvasItemBorder = selector({
  key: 'canvas.withCanvasItemBorder',
  get: () => {},
  set: ({ get, set }, inspectorValues) => {
    const { id, enabled, width, color } = inspectorValues;

    const canvasItem = get(canvasItemsAtomFamily(id));

    // remove the stroke
    if (!enabled || width <= 0) {
      const { stroke } = canvasItem;
      if (stroke) {
        const { stroke, ...rest } = canvasItem;
        set(canvasItemsAtomFamily(id), rest);
      }
      return;
    }

    const colordColor = colord(color);
    if (!colordColor.isValid()) {
      return;
    }

    const opacity = colordColor.alpha();
    const hex = colordColor.alpha(1).toHex();

    const stroke = canvasItem.stroke || {};

    set(canvasItemsAtomFamily(id), {
      ...canvasItem,
      stroke: {
        ...stroke,
        width,
        color: hex,
        opacity,
      },
    });
  },
});

export default withCanvasItemBorder;
