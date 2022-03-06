import React from 'react';

const Rect = ({ x, y, width, height, fill, type, name, ...props }) => {
  return <rect x={x} y={y} width={width} height={height} fill={fill} {...props}></rect>;
};

export default Rect;
