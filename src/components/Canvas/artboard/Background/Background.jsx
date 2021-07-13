import React from 'react';

const Background = ({ width, height }) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 24 24`}>
      <rect x="0" y="2" width="4" height="6" />
    </svg>
  );
};

export default Background;
