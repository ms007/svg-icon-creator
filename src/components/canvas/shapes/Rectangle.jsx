import React from 'react';
import styled from 'styled-components';

import { Rect } from 'components/common';

const Shape = styled(Rect).attrs(({ selectable }) => ({
  pointerEvents: selectable ? 'visiblePainted' : 'none',
}))`
  &:hover {
    cursor: ${({ isMoving }) => (isMoving ? 'move' : 'initial')};
  }
`;

const Rectangle = (props) => {
  return <Shape {...props} />;
};

export default Rectangle;
