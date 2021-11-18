import React from 'react';

const Rectangle = ({ width, height, size }) => {
  return (
    <svg
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
    >
      <rect x="0" y="0" width={width} height={height} fill="currentColor"></rect>
    </svg>
  );
};

export default Rectangle;
