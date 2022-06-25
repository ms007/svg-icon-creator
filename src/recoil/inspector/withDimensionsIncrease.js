import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';

const withDimensionsIncrease = selector({
  key: 'withDimensionsIncrease',
  get: () => {},
  set: ({ get, set }, { name, amount }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      set(canvasItemsAtomFamily(id), (canvasItem) => {
        const value = canvasItem[name];
        const newValue = value + amount;
        if ((name === 'width' || name === 'height') && newValue <= 0) {
          return canvasItem;
        }
        return { ...canvasItem, [name]: newValue };
      });
    });
  },
});

export default withDimensionsIncrease;
