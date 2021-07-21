import { atom, atomFamily } from 'recoil';

export const newCanvasItemAtom = atom({
  key: 'newCanvasItemAtom',
  default: {
    visible: false,
    type: 'none',
  },
});

export const canvasItemsAtom = atom({
  key: 'canvasItemsAtom',
  default: [],
});

export const canvasItemsAtomFamily = atomFamily({
  key: 'canvasItemsAtomFamily',
  default: {},
});
