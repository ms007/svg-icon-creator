import React from 'react';
import styled from 'styled-components';

const Heading = styled.h4`
  font-weight: 500;
  margin: 0;
  margin-bottom: 10px;
`;

const H4 = ({ children }) => {
  return <Heading>{children}</Heading>;
};

export default H4;