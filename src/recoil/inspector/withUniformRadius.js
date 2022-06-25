import { selector } from 'recoil';
import {
  canvasSelectedItemsAtom,
  canvasItemsAtomFamily,
  withCanvasItemMaxRadius,
} from 'recoil/canvas';
import { withIndividualRadiusEnabled } from 'recoil/inspector';

const withUniformRadius = selector({
  key: 'withUniformRadius',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return '';
    }

    const isIndividualRadius = get(withIndividualRadiusEnabled);
    if (isIndividualRadius) {
      return '';
    }

    const radii = selectedCanvasItems.map((id) => {
      const { radius } = get(canvasItemsAtomFamily(id));
      return radius ? Object.values(radius)[0] : 0;
    });

    return radii.every((radius) => radius === radii[0]) ? radii[0] : 'multi';
  },
  set: ({ get, set }, value) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    if (selectedCanvasItems.length < 1) {
      return;
    }

    selectedCanvasItems.forEach((id) => {
      const canvasItem = get(canvasItemsAtomFamily(id));

      if (value <= 0) {
        const { radius, ...rest } = canvasItem;
        set(canvasItemsAtomFamily(id), rest);
        return;
      }

      const max = get(withCanvasItemMaxRadius(id));
      const currentValue = Math.min(value, max);

      const [topLeft, topRight, bottomLeft, bottomRight] = Array(4).fill(currentValue);
      const radius = { topLeft, topRight, bottomLeft, bottomRight };
      set(canvasItemsAtomFamily(id), { ...canvasItem, radius });
    });
  },
});

export default withUniformRadius;
