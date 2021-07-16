import { atom } from 'recoil';

const inspectorAtom = atom({
  key: 'inspectorAtom',
  default: {
    width: 342,
  },
});

export default inspectorAtom;
