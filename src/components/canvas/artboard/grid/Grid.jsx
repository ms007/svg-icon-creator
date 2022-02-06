import React from 'react';
import styled from 'styled-components';

const Circle = styled.circle`
  fill: #b9bcc0;
`;

const Grid = ({ size }) => {
  const radius = 2 / size;

  return (
    <>
      <defs>
        <pattern id="grid" x={0.5} y={0.5} width={1} height={1} patternUnits="userSpaceOnUse">
          <Circle cx={0.5} cy={0.5} r={radius} />
        </pattern>
      </defs>
      <rect x={-0.5} y={-0.5} width={size + 1} height={size + 1} fill="url(#grid)" />
    </>
  );
};

export default Grid;
