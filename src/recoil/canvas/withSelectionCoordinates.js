import { selector } from 'recoil';

import { canvasItemsAtomFamily, canvasSelectedItemsAtom } from './atom';
import getCoordinates from './helper/coordinatesHelper';

const withSelectionCoordinates = selector({
  key: 'withSelectionCoordinates',
  get: ({ get }) => {
    const selectedItems = get(canvasSelectedItemsAtom);
    if (selectedItems.length < 1) {
      return null;
    }

    const selectedItemsCoordinates = selectedItems.map((id) => {
      const item = get(canvasItemsAtomFamily(id));
      const { x, y, width, height } = item;
      const topLeft = [x, y];
      const topRight = [x + width, y];
      const bottomLeft = [x, y + height];
      const bottomRight = [x + width, y + height];
      return { topLeft, topRight, bottomLeft, bottomRight };
    });

    const minTopLeftPosition = selectedItemsCoordinates.reduce(
      (current, { topLeft }) => {
        const [currentX, currentY] = current;
        const [topLeftX, topLeftY] = topLeft;

        return [Math.min(currentX, topLeftX), Math.min(currentY, topLeftY)];
      },
      [1000, 1000]
    );

    const maxBottomRightPosition = selectedItemsCoordinates.reduce(
      (current, { bottomRight }) => {
        const [currentX, currentY] = current;
        const [bottomRightX, bottomRightY] = bottomRight;

        return [Math.max(currentX, bottomRightX), Math.max(currentY, bottomRightY)];
      },
      [-1000, -1000]
    );

    const x = minTopLeftPosition[0];
    const y = minTopLeftPosition[1];
    const width = maxBottomRightPosition[0] - x;
    const height = maxBottomRightPosition[1] - y;

    return getCoordinates(x, y, width, height);
  },
});

export default withSelectionCoordinates;
