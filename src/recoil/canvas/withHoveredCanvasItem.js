import { selector } from 'recoil';

import { canvasSelectedItemsAtom, canvasHoveredItemAtom } from './atom';
import { draggedShapeAtom } from 'recoil/sidebar';

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
  set: ({ get, set }, id) => {
    const draggedShape = get(draggedShapeAtom);
    const selectedItems = get(canvasSelectedItemsAtom);

    if (id == null) {
      set(canvasHoveredItemAtom, null);
    }

    if (draggedShape != null || selectedItems.includes(id)) {
      return;
    }

    set(canvasHoveredItemAtom, id);
  },
});

export default withHoveredCanvasItem;
