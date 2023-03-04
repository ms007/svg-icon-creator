import { selector } from 'recoil';
import { colord } from 'colord';

import { canvasItemsAtomFamily, canvasItemsAtom } from './atom';

const withCanvasItemsColors = selector({
  key: 'canvas.withCanvasItemsColors',
  get: ({ get }) => {
    const canvasItems = get(canvasItemsAtom);

    const allColors = canvasItems.reduce((acc, curr) => {
      const { stroke } = get(canvasItemsAtomFamily(curr));
      if (!stroke) {
        return acc;
      }

      // ToDo: Add fills to the colors

      const color = colord(stroke.color).alpha(stroke.opacity).toHex();
      return [...acc, color];
    }, []);

    const uniqueColors = [...new Set(allColors)];
    return uniqueColors;
  },
});

export default withCanvasItemsColors;
