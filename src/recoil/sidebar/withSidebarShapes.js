import { selector } from 'recoil';

import { canvasItemsAtom } from 'recoil/canvas';

const withSidebarShapes = selector({
  key: 'sidebar.withSidebarShapes',
  get: ({ get }) => {
    const canvasItems = get(canvasItemsAtom);
    return [...canvasItems].reverse();
  },
  set: ({ set }, items) => set(canvasItemsAtom, [...items].reverse()),
});

export default withSidebarShapes;
