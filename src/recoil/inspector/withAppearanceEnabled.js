import { selector } from 'recoil';
import { canvasSelectedItemsAtom } from 'recoil/canvas';

const withAppearanceEnabled = selector({
  key: 'inspector.withAppearanceEnabled',
  get: ({ get }) => {
    const selectedCanvasItems = get(canvasSelectedItemsAtom);
    return selectedCanvasItems.length > 0;
  },
});

export default withAppearanceEnabled;
