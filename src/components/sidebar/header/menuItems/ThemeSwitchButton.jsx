import React from 'react';
import styled from 'styled-components';

import { Drop } from 'components/common';

const Box = styled.div`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ hovered }) => (hovered ? 'var(--neutralDelta)' : 'var(--neutralGamma)')};
`;

const ThemeSwitchButton = (props) => {
  return (
    <Box {...props}>
      <Drop />
    </Box>
  );
};

export default ThemeSwitchButton;
