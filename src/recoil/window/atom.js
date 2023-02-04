import { atom } from 'recoil';

const windowAtom = atom({
  key: 'window',
  default: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
});

export default windowAtom;
