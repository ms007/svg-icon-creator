import React from 'react';
import styled from 'styled-components';

const Shape = styled.rect.attrs()`
  &:hover {
    cursor: ${({ isMoving }) => (isMoving ? 'move' : 'initial')};
  }
`;

const Rectangle = (props) => {
  return <Shape {...props} />;
};

export default Rectangle;