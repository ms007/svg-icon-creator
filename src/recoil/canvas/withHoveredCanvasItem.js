import { selector } from 'recoil';

import { canvasSelectedItemsAtom, canvasHoveredItemAtom } from './atom';

const withHoveredCanvasItem = selector({
  key: 'withHoveredCanvasItem',
  get: ({ get }) => {
    const selectedItems = get(canvasSelectedItemsAtom);
    const hoveredItem = get(canvasHoveredItemAtom);

    if (hoveredItem == null) {
      return null;
    }

    // do no hover if already selected
    const isSelectedItem = selectedItems.some((item) => item === hoveredItem);
    return isSelectedItem ? null : hoveredItem;
  },
  set: ({ set }, id) => {
    set(canvasHoveredItemAtom, id);
  },
});

export default withHoveredCanvasItem;
