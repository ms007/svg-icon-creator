import React from 'react';

const allPaths = {
  topLeft: 'M11,3 L6,3 C4.34314575,3 3,4.34314575 3,6 L3,11 L3,11',
  topRight: 'M13,3 L18,3 C19.6568542,3 21,4.34314575 21,6 L21,11 L21,11',
  bottomLeft: 'M3,13 L3,18 C3,19.6568542 4.34314575,21 6,21 L11,21 L11,21',
  bottomRight: 'M13,21 L18,21 C19.6568542,21 21,19.6568542 21,18 L21,13 L21,13',
};

const Corner = ({ height, stroke, strokeWidth, className, ...props }) => {
  const paths = Object.keys(allPaths).map((key) => ({
    key,
    d: allPaths[key],
    stroke: props[key] ? (stroke ? stroke : 'inherit') : 'currentColor',
    strokeWidth,
  }));

  return (
    <svg
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      {paths.map(({ d, stroke, strokeWidth, key }) => (
        <path d={d} stroke={stroke} strokeWidth={strokeWidth} key={key}></path>
      ))}
    </svg>
  );
};

export default Corner;

Corner.defaultProps = {
  height: '24px',
  topLeft: false,
  topRight: false,
  bottomLeft: false,
  bottomRight: false,
  strokeWidth: 2,
};
