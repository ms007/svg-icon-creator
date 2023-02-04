import { atom } from 'recoil';

export const presetsAtom = atom({
  key: 'presets',
  default: {
    iconSize: 24,
  },
});

export const presetsThemeAtom = atom({
  key: 'presets.theme',
  default: null,
});

export default presetsAtom;
