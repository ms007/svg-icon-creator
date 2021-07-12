import { atom } from 'recoil';

export const sideBarState = atom({
  key: '[size] sidebar size',
  default: 342,
});

export const inspectorState = atom({
  key: '[size] inspector size',
  default: 342,
});
