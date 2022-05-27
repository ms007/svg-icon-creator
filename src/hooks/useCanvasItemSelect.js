import { useSetRecoilState } from 'recoil';
import { canvasSelectedItemsAtom } from 'recoil/canvas';

export default function useCanvasItemSelect() {
  const selectItems = useSetRecoilState(canvasSelectedItemsAtom);

  return (id, options = {}) => {
    const { shiftKey = false } = options;
    if (!shiftKey) {
      selectItems([id]);
      return;
    }

    selectItems((selectedItems) => {
      if (selectedItems.includes(id)) {
        return selectedItems.filter((item) => item !== id);
      }

      return [...selectedItems, id];
    });
  };
}
