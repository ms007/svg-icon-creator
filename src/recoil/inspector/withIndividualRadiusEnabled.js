import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';
import { inspectorIndividualCornersAtomFamily } from './atom';

const withIndividualRadiusEnabled = selector({
  key: 'withIndividualRadiusEnabled',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return false;
    }

    return selectedCanvasItems.some((id) => get(inspectorIndividualCornersAtomFamily(id)));
  },
  set: ({ get, set }, enabled) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      set(inspectorIndividualCornersAtomFamily(id), enabled);

      const item = get(canvasItemsAtomFamily(id));
      const { radius } = item;
      if (radius && !enabled) {
        // take the largest individual corner as new uniform value
        const values = Object.values(radius);
        const max = Math.max(...values);
        const [topLeft, topRight, bottomLeft, bottomRight] = Array(4).fill(max);
        const changedRadius = { topLeft, topRight, bottomLeft, bottomRight };
        set(canvasItemsAtomFamily(id), { ...item, radius: changedRadius });
      }
    });
  },
});

export default withIndividualRadiusEnabled;
