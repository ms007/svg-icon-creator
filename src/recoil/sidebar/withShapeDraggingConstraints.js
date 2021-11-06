import { selectorFamily } from 'recoil';

import { draggedShapeAtom } from './atom';
import withCanvasItemsReversed from 'recoil/canvas/withCanvasItemsReversed';

const withShapeDraggingConstraints = selectorFamily({
  key: 'withShapeDraggingConstraints',
  get: (id) => ({ get }) => {
    const initial = {
      canDropBefore: false,
      canDropAfter: false,
    };

    const canvasItems = get(withCanvasItemsReversed);
    const draggedItem = get(draggedShapeAtom);

    const count = canvasItems.length;
    if (draggedItem == null || count < 2) {
      return initial;
    }

    const draggingIndex = canvasItems.indexOf(draggedItem);
    const hoveredIndex = canvasItems.indexOf(id);

    const canDropBefore = !(draggingIndex === hoveredIndex || draggingIndex + 1 === hoveredIndex);
    const canDropAfter = !(draggingIndex === hoveredIndex || draggingIndex - 1 === hoveredIndex);

    return {
      canDropBefore,
      canDropAfter,
    };
  },
});

export default withShapeDraggingConstraints;
