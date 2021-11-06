import { atom } from 'recoil';

export const sidebarAtom = atom({
  key: 'sidebarAtom',
  default: {
    width: 342,
  },
});

export const draggedShapeAtom = atom({
  key: 'draggedShapeAtom',
  default: null,
});
