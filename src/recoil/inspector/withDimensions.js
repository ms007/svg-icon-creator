import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';

const getSameValueOrMulti = (array) => {
  const allEqual = array.every((val) => val === array[0]);
  return allEqual ? array[0] : 'multi';
};

const withDimensions = selector({
  key: 'withDimensions',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return { width: '', height: '', x: '', y: '' };
    }

    if (selectedCanvasItems.length === 1) {
      const id = selectedCanvasItems[0];
      const { width, height, x, y } = get(canvasItemsAtomFamily(id));
      return { width, height, x, y };
    }

    const values = selectedCanvasItems.map((id) => get(canvasItemsAtomFamily(id)));

    const width = getSameValueOrMulti(values.map(({ width }) => width));
    const height = getSameValueOrMulti(values.map(({ height }) => height));
    const x = getSameValueOrMulti(values.map(({ x }) => x));
    const y = getSameValueOrMulti(values.map(({ y }) => y));

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
        return value != null && value !== '' && value !== 'multi';
      })
      .reduce((acc, key) => {
        return { ...acc, [key]: dimensions[key] };
      }, {});

    selectedCanvasItems.forEach((id) => {
      set(canvasItemsAtomFamily(id), (canvasItem) => ({ ...canvasItem, ...validDimensions }));
    });
  },
});

export default withDimensions;
