import { selector } from 'recoil';

import withSelectionCoordinates from './withSelectionCoordinates';

const withSelectionGripCords = selector({
  key: 'withSelectionGripCords',
  get: ({ get }) => {
    const coordinates = get(withSelectionCoordinates);
    if (coordinates == null) {
      return null;
    }

    const {
      topLeft,
      topRight,
      bottomRight,
      bottomLeft,
      topCenter,
      bottomCenter,
      leftCenter,
      rightCenter,
    } = coordinates;

    return {
      nw: [topLeft.x, topLeft.y],
      ne: [topRight.x, topRight.y],
      sw: [bottomLeft.x, bottomLeft.y],
      se: [bottomRight.x, bottomRight.y],
      n: [topCenter.x, topCenter.y],
      w: [leftCenter.x, leftCenter.y],
      e: [rightCenter.x, rightCenter.y],
      s: [bottomCenter.x, bottomCenter.y],
    };
  },
});

export default withSelectionGripCords;
