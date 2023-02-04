import { atom } from 'recoil';

export const sidebarAtom = atom({
  key: 'sidebar',
  default: {
    width: 342,
  },
});

export const draggedShapeAtom = atom({
  key: 'sidebar.draggedShape',
  default: null,
});
