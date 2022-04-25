import { selector } from 'recoil';
import { canvasSelectedItemsAtom, canvasItemsAtomFamily } from 'recoil/canvas';
import { inspectorIndividualCornersAtomFamily } from './atom';
import withUniformRadius from './withUniformRadius';

const withIndividualRadiusEnabled = selector({
  key: 'withIndividualRadiusEnabled',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return false;
    }

    // ToDo: What if we would like to select more than one item
    const id = selectedCanvasItems[0];
    return get(inspectorIndividualCornersAtomFamily(id));
  },
  set: ({ get, set }, enabled) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    // ToDo: What if we would like to select more than one item
    const id = selectedCanvasItems[0];
    set(inspectorIndividualCornersAtomFamily(id), enabled);

    const { radius } = get(canvasItemsAtomFamily(id));
    if (radius && !enabled) {
      // take the largest individual corner as new uniform value
      const values = Object.values(radius);
      set(withUniformRadius, Math.max.apply(null, values));
    }
  },
});

export default withIndividualRadiusEnabled;
