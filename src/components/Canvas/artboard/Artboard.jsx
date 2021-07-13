import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  margin: ${(props) => `${props.margin}px`};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  background-color: ${(props) => props.theme.artboard.background};
  box-shadow: 0 0 2px 0 #b9bcc0cc;
  border-radius: 2px;
  color: ${(props) => props.theme.artboard.color};
`;

const Artboard = ({ width, margin }) => {
  // ToDo: do not hardcode viewBox values - make them editable

  return (
    <Box width={width} margin={margin}>
      <svg width={width} height={width} viewBox={`0 0 24 24`}>
        <rect x="0" y="2" width="4" height="6" />
      </svg>
    </Box>
  );
};

export default Artboard;
