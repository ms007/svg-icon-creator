import { path } from 'd3-path';

// https://stackoverflow.com/questions/1734745/how-to-create-circle-with-b%C3%A9zier-curves
const controlPointLength = (4 / 3) * Math.tan(Math.PI / 8);

const generatePath = (points) => {
  const pathCreator = path();

  // topLeft
  (() => {
    const { x, y, r, curved } = points.topLeft;
    pathCreator.moveTo(x, curved ? y + r : y);
    curved &&
      pathCreator.bezierCurveTo(
        x,
        y + r - controlPointLength * r,
        x + r - controlPointLength * r,
        y,
        x + r,
        y
      );
  })();

  // topRight
  (() => {
    const { x, y, r, curved } = points.topRight;
    pathCreator.lineTo(curved ? x - r : x, y);
    curved &&
      pathCreator.bezierCurveTo(
        x - r + controlPointLength * r,
        y,
        x,
        y + r - controlPointLength * r,
        x,
        y + r
      );
  })();

  // bottomRight
  (() => {
    const { x, y, r, curved } = points.bottomRight;
    pathCreator.lineTo(x, curved ? y - r : y);
    curved &&
      pathCreator.bezierCurveTo(
        x,
        y - r + controlPointLength * r,
        x - r + controlPointLength * r,
        y,
        x - r,
        y
      );
  })();

  // bottomLeft
  (() => {
    const { x, y, r, curved } = points.bottomLeft;
    pathCreator.lineTo(curved ? x + r : x, y);
    curved &&
      pathCreator.bezierCurveTo(
        x + r - controlPointLength * r,
        y,
        x,
        y - r + controlPointLength * r,
        x,
        y - r
      );
  })();

  pathCreator.closePath();
  return pathCreator.toString();
};

const pathGenerator = (x, y, width, height, radius) => {
  const points = Object.keys(radius).reduce((result, key) => {
    const r = radius[key];
    const curved = r > 0;
    switch (key) {
      case 'topLeft':
        return { ...result, [key]: { x, y, r, curved } };
      case 'topRight':
        return { ...result, [key]: { x: x + width, y, r, curved } };
      case 'bottomLeft':
        return { ...result, [key]: { x, y: y + height, r, curved } };
      case 'bottomRight':
        return { ...result, [key]: { x: x + width, y: y + height, r, curved } };
      default:
        return result;
    }
  }, {});

  return generatePath(points);
};

export default pathGenerator;
