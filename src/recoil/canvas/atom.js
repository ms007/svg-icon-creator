import { atom, atomFamily } from 'recoil';

export const canvasIsCreatingNewItemAtom = atom({
  key: 'canvas.creatingNewItem',
  default: false,
});

export const canvasIsResizingItemAtom = atom({
  key: 'canvas.resizingItem',
  default: false,
});

export const canvasNewItemTypeAtom = atom({
  key: 'canvas.newItemType',
  default: null,
});

export const canvasItemsAtom = atom({
  key: 'canvas.items',
  default: [],
});

export const canvasItemsAtomFamily = atomFamily({
  key: 'canvas.itemsFamily',
  default: {},
});

export const canvasSelectedItemsAtom = atom({
  key: 'canvas.selectedItems',
  default: [],
});

export const canvasHoveredItemAtom = atom({
  key: 'canvas.hoveredItem',
  default: null,
});

export const canvasEditingItemAtom = atom({
  key: 'canvas.editingItem',
  default: null,
});
