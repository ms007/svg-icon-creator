import { selectorFamily } from 'recoil';

import { canvasSelectedItemsAtom } from 'recoil/canvas';
import withSidebarShapes from './withSidebarShapes';

const withSidebarBoxBorderRadius = selectorFamily({
  key: 'sidebar.withSidebarBoxBorderRadius',
  get:
    (id) =>
    ({ get }) => {
      const borderRadius = {
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
      };

      const canvasItems = get(withSidebarShapes);
      const selectedCanvasItems = get(canvasSelectedItemsAtom);
      if (canvasItems.length < 2 || selectedCanvasItems < 2) {
        return borderRadius;
      }

      const indexOfCurrentItem = canvasItems.indexOf(id);

      const hasPreviousItem = indexOfCurrentItem - 1 >= 0;
      const isPreviousItemSelected = hasPreviousItem
        ? selectedCanvasItems.some((item) => item === canvasItems[indexOfCurrentItem - 1])
        : false;

      const hasNextItem = indexOfCurrentItem + 1 <= canvasItems.length;
      const isNextItemSelected = hasNextItem
        ? selectedCanvasItems.some((item) => item === canvasItems[indexOfCurrentItem + 1])
        : false;

      if (isPreviousItemSelected) {
        borderRadius.borderTopLeftRadius = 0;
        borderRadius.borderTopRightRadius = 0;
      }

      if (isNextItemSelected) {
        borderRadius.borderBottomLeftRadius = 0;
        borderRadius.borderBottomRightRadius = 0;
      }

      return borderRadius;
    },
});

export default withSidebarBoxBorderRadius;
