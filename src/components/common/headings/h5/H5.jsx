import React from 'react';
import styled from 'styled-components';

import theme from 'styled-theming';

const color = theme('mode', {
  light: 'var(--neutral50)',
  dark: 'var(--neutral40)',
});

const Heading = styled.h5`
  font-weight: 700;
  font-size: 12px;
  margin: 15px 0;
  color: ${color};
`;

const H4 = ({ children, className }) => {
  return <Heading className={className}>{children}</Heading>;
};

export default H4;
