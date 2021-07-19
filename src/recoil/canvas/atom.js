import { atom, atomFamily } from 'recoil';

export const canvasItemsAtom = atom({
  key: 'canvasItemsAtom',
  default: [],
});

export const canvasItemsAtomFamily = atomFamily({
  key: 'canvasItemsAtomFamily',
  default: {},
});
