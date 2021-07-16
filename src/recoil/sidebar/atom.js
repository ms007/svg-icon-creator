import { atom } from 'recoil';

const sidebarAtom = atom({
  key: 'sidebarAtom',
  default: {
    width: 342,
  },
});

export default sidebarAtom;
