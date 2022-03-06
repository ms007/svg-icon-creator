import React from 'react';
import styled from 'styled-components';

import { H5 } from 'components/common';
import Uniform from './uniform';

const Box = styled.div`
  display: flex;
  align-items: center;
`;

const Corners = () => {
  return (
    <>
      <H5>Corner Radius</H5>

      <Box>
        <Uniform />
      </Box>
    </>
  );
};

export default Corners;
