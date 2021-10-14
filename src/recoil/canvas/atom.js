import { atom, atomFamily } from 'recoil';

export const canvasIsCreatingNewItemAtom = atom({
  key: 'canvasCreatingNewItemAtom',
  default: false,
});

export const canvasIsResizingItemAtom = atom({
  key: 'canvasResizingItemAtom',
  default: false,
});

export const newCanvasItemTypeAtom = atom({
  key: 'newCanvasItemTypeAtom',
  default: null,
});

export const canvasItemsAtom = atom({
  key: 'canvasItemsAtom',
  default: [],
});

export const canvasItemsAtomFamily = atomFamily({
  key: 'canvasItemsAtomFamily',
  default: {},
});

export const canvasSelectedItemAtom = atom({
  key: 'canvasSelectedItemAtom',
  default: null,
});

export const canvasHoveredItemAtom = atom({
  key: 'canvasHoveredItemAtom',
  default: null,
});
