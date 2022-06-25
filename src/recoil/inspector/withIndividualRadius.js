import { selector } from 'recoil';
import {
  canvasSelectedItemsAtom,
  canvasItemsAtomFamily,
  withCanvasItemMaxRadius,
} from 'recoil/canvas';

const corners = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'];
const defaultIndividualRadius = { topLeft: 0, topRight: 0, bottomLeft: 0, bottomRight: 0 };

const withIndividualRadius = selector({
  key: 'withIndividualRadius',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return '';
    }

    return selectedCanvasItems
      .map((id) => {
        const { radius } = get(canvasItemsAtomFamily(id));
        return radius || defaultIndividualRadius;
      })
      .reduce((prev, current) => {
        const [topLeft, topRight, bottomLeft, bottomRight] = corners.map((corner) => {
          const prevCorner = prev[corner];
          const currentCorner = current[corner];
          return prevCorner === 'multi' || prevCorner !== currentCorner ? 'multi' : currentCorner;
        });
        return { topLeft, topRight, bottomLeft, bottomRight };
      });
  },
  set: ({ get, set }, { name, value }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      const canvasItem = get(canvasItemsAtomFamily(id));
      const radius = { ...(canvasItem.radius || defaultIndividualRadius) };

      const max = get(withCanvasItemMaxRadius(id));
      radius[name] = Math.min(value, max);

      const isEmpty = Object.values(radius).every((value) => value <= 0);
      if (isEmpty) {
        const { radius, ...rest } = canvasItem;
        set(canvasItemsAtomFamily(id), rest);
        return;
      }

      set(canvasItemsAtomFamily(id), { ...canvasItem, radius });
    });
  },
});

export default withIndividualRadius;
