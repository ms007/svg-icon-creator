import React from 'react';

const Grid = ({ size }) => {
  const radius = 2 / size;

  return (
    <>
      <defs>
        <pattern id="grid" x={0.5} y={0.5} width={1} height={1} patternUnits="userSpaceOnUse">
          <circle cx={0.5} cy={0.5} r={radius} fill="red" />
        </pattern>
      </defs>
      <rect width={size} height={size} fill="url(#grid)" />
    </>
  );
};

export default Grid;
