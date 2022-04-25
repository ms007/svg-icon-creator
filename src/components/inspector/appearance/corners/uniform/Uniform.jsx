import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { NumberInput } from 'components/common';
import { withUniformRadius, withMaxRadius } from 'recoil/inspector';

const Box = styled.div`
  width: 80px;
  height: 28px;
`;

const Uniform = ({ disabled }) => {
  const [radius, setRadius] = useRecoilState(withUniformRadius);
  const max = useRecoilValue(withMaxRadius);

  return (
    <Box>
      <NumberInput
        label="px"
        value={radius}
        onChange={setRadius}
        min={0}
        max={max}
        disabled={disabled}
      />
    </Box>
  );
};

export default Uniform;
