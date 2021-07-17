import { atom } from 'recoil';

const presetsAtom = atom({
  key: 'presetsAtom',
  default: {
    iconSize: 24,
  },
});

export default presetsAtom;
