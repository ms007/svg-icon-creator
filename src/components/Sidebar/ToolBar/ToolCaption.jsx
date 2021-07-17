import React from 'react';
import styled from 'styled-components';

const Caption = styled.span`
  margin-left: auto;
`;

const ToolCaption = ({ caption }) => {
  return <Caption>{caption}</Caption>;
};

export default ToolCaption;
