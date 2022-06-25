import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { canvasSelectedItemsAtom } from 'recoil/canvas';

export default function useCanvasItemSelect() {
  const [selectedItems, selectItems] = useRecoilState(canvasSelectedItemsAtom);

  return useCallback(
    (id, options = {}) => {
      const { shiftKey = false } = options;

      if (!shiftKey && selectedItems.length <= 1) {
        selectItems([id]);
        return;
      }

      if (!shiftKey && selectedItems.length > 1) {
        if (!selectedItems.includes(id)) {
          selectItems([id]);
        }
        return;
      }

      if (selectedItems.includes(id)) {
        selectItems(selectedItems.filter((item) => item !== id));
        return;
      }

      selectItems([...selectedItems, id]);
    },
    [selectedItems, selectItems]
  );
}
