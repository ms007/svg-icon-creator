import { atom } from 'recoil';

const windowAtom = atom({
  key: 'windowAtom',
  default: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
});

export default windowAtom;
