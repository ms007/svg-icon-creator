import { selector } from 'recoil';
import { canvasIsCreatingNewItemAtom, newCanvasItemTypeAtom, canvasEditingItemAtom } from './atom';

const withNewCanvasItem = selector({
  key: 'withNewCanvasItem',
  get: ({ get }) => {
    return get(newCanvasItemTypeAtom);
  },
  set: ({ get, set }, type) => {
    const editingCanvasItem = get(canvasEditingItemAtom);
    const isEditing = editingCanvasItem != null;
    if (isEditing) {
      return;
    }

    set(newCanvasItemTypeAtom, type);
    set(canvasIsCreatingNewItemAtom, true);
  },
});

export default withNewCanvasItem;
