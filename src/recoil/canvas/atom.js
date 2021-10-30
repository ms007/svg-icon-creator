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

export const canvasSelectedItemsAtom = atom({
  key: 'canvasSelectedItemsAtom',
  default: [],
});

export const canvasHoveredItemAtom = atom({
  key: 'canvasHoveredItemAtom',
  default: null,
});

export const canvasEditingItemAtom = atom({
  key: 'canvasEditingItemAtom',
  default: null,
});
