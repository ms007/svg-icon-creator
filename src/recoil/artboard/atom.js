import { atom } from 'recoil';

const artboardAtom = atom({
  key: 'artboardAtom',
  default: {
    margin: 80,
    minWidth: 300,
    maxWidth: 900,
    size: 24,
  },
});

export default artboardAtom;
