import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { withPixelSize } from 'recoil/artboard';

const Path = styled.path.attrs(({ strokeWidth }) => ({
  fill: 'none',
  stroke: 'var(--primary)',
  strokeWidth,
  shapeRendering: 'crispEdges',
}))`
  pointer-events: none;
`;

const Border = ({ coordinates }) => {
  const onePixel = useRecoilValue(withPixelSize);

  const offset = 0;

  const offsetX = coordinates.topLeft.x - offset;
  const offsetY = coordinates.topLeft.y - offset;
  const offsetWidth = coordinates.width + offset * 2;
  const offsetHeight = coordinates.height + offset * 2;

  const topLeft = { x: offsetX, y: offsetY };
  const topRight = { x: offsetX + offsetWidth, y: offsetY };
  const bottomRight = { x: offsetX + offsetWidth, y: offsetY + offsetHeight };
  const bottomLeft = { x: offsetX, y: offsetY + offsetHeight };

  const d =
    `M${topLeft.x},${topLeft.y} L${topRight.x},${topRight.y}` +
    ` ${bottomRight.x},${bottomRight.y} ${bottomLeft.x},${bottomLeft.y}z`;

  return <Path strokeWidth={onePixel * 2} d={d}></Path>;
};

export default Border;
