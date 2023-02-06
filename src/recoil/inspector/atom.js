import { atom, atomFamily } from 'recoil';

export const inspectorAtom = atom({
  key: 'inspector',
  default: {
    width: 342,
  },
});

export const inspectorIndividualCornersAtomFamily = atomFamily({
  key: 'inspector.individualCornersFamily',
  default: false,
});

export const inspectorBorderAtomFamily = atomFamily({
  key: 'inspector.borderAtomFamily',
  default: {
    enabled: false,
    width: 1,
  },
});
