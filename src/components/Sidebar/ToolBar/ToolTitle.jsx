import React from 'react';
import styled from 'styled-components';

const Title = styled.span`
  padding-left: 10px;
`;

const ToolTitle = ({ title }) => {
  return <Title>{title}</Title>;
};

export default ToolTitle;
