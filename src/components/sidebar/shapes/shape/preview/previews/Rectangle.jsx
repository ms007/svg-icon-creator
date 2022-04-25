import React from 'react';

import { Rect } from 'components/common';

const Rectangle = ({ width, height, x, y, size, ...props }) => {
  return (
    <svg
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
    >
      <Rect x={0} y={0} width={width} height={height} fill="currentColor" {...props}></Rect>
    </svg>
  );
};

export default Rectangle;
