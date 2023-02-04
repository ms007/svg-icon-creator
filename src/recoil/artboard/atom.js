import { atom } from 'recoil';

export const artboardIsReadyAtom = atom({
  key: 'artboard.isReady',
  default: false,
});

export const artboardAtom = atom({
  key: 'artboard',
  default: {
    margin: 100,
    minWidth: 300,
    maxWidth: 900,
  },
});
