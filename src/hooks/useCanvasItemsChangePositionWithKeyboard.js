import { useKey } from 'react-use';
import { useRecoilCallback } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';

export default function useCanvasItemsChangePositionWithKeyboard() {
  const rePosition = useRecoilCallback(
    ({ snapshot, set }) => async (direction) => {
      const selectedItems = await snapshot.getPromise(canvasSelectedItemsAtom);
      selectedItems.forEach((id) =>
        set(canvasItemsAtomFamily(id), (shape) => {
          return {
            ...shape,
            y: direction === 'up' ? shape.y - 1 : direction === 'down' ? shape.y + 1 : shape.y,
            x: direction === 'left' ? shape.x - 1 : direction === 'right' ? shape.x + 1 : shape.x,
          };
        })
      );
    },
    []
  );

  useKey('ArrowUp', () => rePosition('up'));
  useKey('ArrowDown', () => rePosition('down'));
  useKey('ArrowLeft', () => rePosition('left'));
  useKey('ArrowRight', () => rePosition('right'));
}
