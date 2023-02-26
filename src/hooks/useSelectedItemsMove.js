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
            const { stroke } = state;

            const offset = {
              x: currentShape.x - state.x,
              y: currentShape.y - state.y,
            };

            // x and y are affected by border with
            const x = position.x - offset.x - (stroke?.width || 0) / 2;
            const y = position.y - offset.y - (stroke?.width || 0) / 2;

            const shape = { ...state, x, y };
            console.log('shape', shape);
            return options.snapToGrid ? snapToGrid(shape) : shape;
          })
        );
      },
    [selectedItems, id]
  );
}
