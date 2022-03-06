import React from 'react';
import styled from 'styled-components';

import theme from 'styled-theming';

const color = theme('mode', {
  light: 'var(--neutralDelta)',
  dark: 'var(--neutralGamma)',
});

const Heading = styled.h4`
  font-weight: 700;
  margin: 0;
  margin-bottom: 15px;
  color: ${color};
`;

const H4 = ({ children, className }) => {
  return <Heading className={className}>{children}</Heading>;
};

export default H4;
