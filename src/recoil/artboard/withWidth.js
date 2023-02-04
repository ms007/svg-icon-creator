import { selector } from 'recoil';

import { artboardAtom } from './atom';
import windowAtom from 'recoil/window';
import sidebarAtom from 'recoil/sidebar';
import { inspectorAtom } from 'recoil/inspector';

const artboardWithWidth = selector({
  key: 'artboardWithWidth',
  get: ({ get }) => {
    const { margin, minWidth, maxWidth } = get(artboardAtom);

    const window = get(windowAtom);
    const sidebar = get(sidebarAtom);
    const inspector = get(inspectorAtom);

    const desiredWidth = window.width - sidebar.width - inspector.width - margin * 2;
    const desiredHeight = window.height - margin * 2;

    let artboardWidth = desiredWidth < desiredHeight ? desiredWidth : desiredHeight;
    artboardWidth = artboardWidth >= minWidth ? artboardWidth : minWidth;
    artboardWidth = artboardWidth <= maxWidth ? artboardWidth : maxWidth;

    return artboardWidth;
  },
});

export default artboardWithWidth;
