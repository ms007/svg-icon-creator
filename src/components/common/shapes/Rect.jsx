import React from 'react';

const Rect = ({ x, y, width, height, fill, radius, type, name, ...props }) => {
  const hasRadius = radius != null;

  if (hasRadius) {
    const value = Object.values(radius)[0];
    props = { ...props, rx: value };
  }

  return <rect x={x} y={y} width={width} height={height} fill={fill} {...props}></rect>;
};

export default Rect;
