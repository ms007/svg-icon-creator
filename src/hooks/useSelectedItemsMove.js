import { useRecoilCallback, useRecoilValue } from 'recoil';

import { canvasItemsAtomFamily, canvasSelectedItemsAtom } from 'recoil/canvas';

const snapToGrid = (shape) => {
  return {
    ...shape,
    x: Math.round(shape.x),
    y: Math.round(shape.y),
  };
};

export default function useSelectedItemsMove(id) {
  const selectedItems = useRecoilValue(canvasSelectedItemsAtom);

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (position, options = {}) => {
        const currentShape = snapshot.getLoadable(canvasItemsAtomFamily(id)).contents;

        selectedItems.forEach((id) =>
          set(canvasItemsAtomFamily(id), (state) => {
            const offset = {
              x: currentShape.x - state.x,
              y: currentShape.y - state.y,
            };

            const x = position.x - offset.x;
            const y = position.y - offset.y;

            const shape = { ...state, x, y };
            return options.snapToGrid ? snapToGrid(shape) : shape;
          })
        );
      },
    [selectedItems, id]
  );
}
