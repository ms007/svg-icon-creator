import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from './atom';

const withSelectedCanvasItemsDimensions = selector({
  key: 'withSelectedCanvasItemsDimensions',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return { width: '', height: '', x: '', y: '' };
    }

    // ToDo: What if we would like to select more than one item
    const id = selectedCanvasItems[0];
    const { width, height, x, y } = get(canvasItemsAtomFamily(id));
    return { width, height, x, y };
  },
  set: ({ get, set }, dimensions) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    const validDimensions = Object.keys(dimensions)
      .filter((key) => {
        const value = dimensions[key];
        return value != null && value !== '';
      })
      .reduce((acc, key) => {
        return { ...acc, [key]: dimensions[key] };
      }, {});

    // ToDo: What if we would like to select more than one item
    const id = selectedCanvasItems[0];

    const canvasItem = get(canvasItemsAtomFamily(id));
    set(canvasItemsAtomFamily(id), { ...canvasItem, ...validDimensions });
  },
});

export default withSelectedCanvasItemsDimensions;
