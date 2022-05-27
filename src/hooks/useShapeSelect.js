import { useSetRecoilState, useRecoilValue } from 'recoil';
import { canvasSelectedItemsAtom } from 'recoil/canvas';
import { withSidebarShapes } from 'recoil/sidebar';

const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

export default function useShapeSelect() {
  const allItems = useRecoilValue(withSidebarShapes);
  const selectItems = useSetRecoilState(canvasSelectedItemsAtom);

  return (id, options = {}) => {
    const { shiftKey = false, metaKey = false, ctrlKey = false } = options;

    if (shiftKey) {
      selectItems((selectedItems) => {
        const count = selectItems.length;
        const lastSelectedItem = count > 0 ? selectedItems[count - 1] : allItems[0];
        const indexOfLastSelectedItem = allItems.indexOf(lastSelectedItem);
        const indexOfCurrentItem = allItems.indexOf(id);
        const min = Math.min(indexOfLastSelectedItem, indexOfCurrentItem) + 1;
        const max = Math.max(indexOfLastSelectedItem, indexOfCurrentItem) - 1;
        const indexesOfMissingItems = range(min, max);
        const newlySelectedItems = indexesOfMissingItems.map((index) => allItems[index]);
        return [...new Set([...selectedItems, ...newlySelectedItems, id])];
      });
      return;
    }

    if (ctrlKey || metaKey) {
      selectItems((selectedItems) => {
        if (selectedItems.includes(id)) {
          return selectedItems.filter((item) => item !== id);
        }

        return [...selectedItems, id];
      });
      return;
    }

    selectItems([id]);
  };
}
