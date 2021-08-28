import { selector } from 'recoil';

import withWidth from './withWidth';
import presetsAtom from '../presets';

const artboardWithPixelSize = selector({
  key: 'artboardWithPixelSize',
  get: ({ get }) => {
    const artboardWidth = get(withWidth);
    const { iconSize } = get(presetsAtom);

    return iconSize / artboardWidth;
  },
});

export default artboardWithPixelSize;
