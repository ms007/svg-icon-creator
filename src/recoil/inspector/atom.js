import { atom, atomFamily } from 'recoil';

export const inspectorAtom = atom({
  key: 'inspectorAtom',
  default: {
    width: 342,
  },
});

export const inspectorIndividualCornersAtomFamily = atomFamily({
  key: 'inspectorIndividualCornersAtomFamily',
  default: false,
});
