import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtom, canvasHoveredItemAtom } from './atom';

const withCanvasItemsDelete = selector({
  key: 'canvas.withCanvasItemsDelete',
  get: () => {},
  set: ({ get, set }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom) || [];
    if (selectedCanvasItems.length < 1) {
      return;
    }

    const currentCanvasItems = get(canvasItemsAtom);

    const canvasItems = currentCanvasItems.filter(
      (convasItem) => !selectedCanvasItems.includes(convasItem)
    );

    set(canvasItemsAtom, canvasItems);
    set(canvasHoveredItemAtom, null);

    if (canvasItems.length < 1) {
      set(canvasSelectedItemsAtom, []);
      return;
    }

    set(canvasSelectedItemsAtom, [canvasItems[canvasItems.length - 1]]);
  },
});

export default withCanvasItemsDelete;
