import { atom } from 'recoil';

const artboardAtom = atom({
  key: 'artboardAtom',
  default: {
    margin: 100,
    minWidth: 300,
    maxWidth: 900,
  },
});

export default artboardAtom;
