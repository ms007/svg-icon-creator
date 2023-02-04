import { atom } from 'recoil';

export const artboardIsReadyAtom = atom({
  key: 'artboardIsReadyAtom',
  default: false,
});

export const artboardAtom = atom({
  key: 'artboardAtom',
  default: {
    margin: 100,
    minWidth: 300,
    maxWidth: 900,
  },
});
