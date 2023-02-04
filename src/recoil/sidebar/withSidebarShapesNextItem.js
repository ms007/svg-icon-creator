import { selector } from 'recoil';

import { canvasEditingItemAtom } from 'recoil/canvas';
import withSidebarShapes from './withSidebarShapes';

const withSidebarShapesNextItem = selector({
  key: 'sidebar.withSidebarShapesNextItem',
  get: ({ get }) => {
    const editingId = get(canvasEditingItemAtom);
    if (editingId == null) {
      return null;
    }

    const canvasItems = get(withSidebarShapes);
    const count = canvasItems.length;
    if (count < 2) {
      return null;
    }

    const index = canvasItems.indexOf(editingId);
    return canvasItems[index === count - 1 ? 0 : index + 1];
  },
});

export default withSidebarShapesNextItem;
