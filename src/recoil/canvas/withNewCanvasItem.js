import { selector } from 'recoil';
import { canvasIsCreatingNewItemAtom, canvasNewItemTypeAtom, canvasEditingItemAtom } from './atom';

const withNewCanvasItem = selector({
  key: 'canvas.withNewCanvasItem',
  get: ({ get }) => {
    return get(canvasNewItemTypeAtom);
  },
  set: ({ get, set }, type) => {
    const editingCanvasItem = get(canvasEditingItemAtom);
    const isEditing = editingCanvasItem != null;
    if (isEditing) {
      return;
    }

    set(canvasNewItemTypeAtom, type);
    set(canvasIsCreatingNewItemAtom, true);
  },
});

export default withNewCanvasItem;
