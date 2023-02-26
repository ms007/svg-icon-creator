import React from 'react';
import { omit } from 'utils';
import generatePath from './pathGenerator';

const Rect = ({ x, y, width, height, fill, radius, stroke, ...props }) => {
  props = omit(props, ['type', 'name', 'selectable', 'isMoving']);

  const hasStroke = stroke != null;
  if (hasStroke) {
    props.stroke = stroke.color;
    props.strokeOpacity = stroke.opacity;
    props.strokeWidth = stroke.width;
  }

  x = hasStroke ? x + stroke.width / 2 : x;
  y = hasStroke ? y + stroke.width / 2 : y;
  width = hasStroke ? width - stroke.width : width;
  height = hasStroke ? height - stroke.width : height;

  const hasRadius = radius != null;
  if (!hasRadius) {
    return <rect x={x} y={y} width={width} height={height} fill={fill} {...props}></rect>;
  }

  const hasIndividualRadius = !(new Set(Object.values(radius)).size === 1);
  if (!hasIndividualRadius) {
    const value = Object.values(radius)[0];
    props = { ...props, rx: value };
    return <rect x={x} y={y} width={width} height={height} fill={fill} {...props}></rect>;
  }

  const path = generatePath(x, y, width, height, radius);
  return <path d={path} fill={fill} {...props}></path>;
};

export default Rect;
