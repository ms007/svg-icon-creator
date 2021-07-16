import { atom } from 'recoil';

const presetsAtom = atom({
  key: 'presetsAtom',
  default: {
    size: 24,
  },
});

export default presetsAtom;
