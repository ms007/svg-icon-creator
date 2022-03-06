import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { NumberInput } from 'components/common';
import { withUniformRadius } from 'recoil/inspector';

const Box = styled.div`
  width: 80px;
  height: 28px;
  margin-right: 8px;
`;

const Uniform = () => {
  const [radius, setRadius] = useRecoilState(withUniformRadius);

  const disabled = radius == null || radius === '';

  return (
    <Box>
      <NumberInput label="px" value={radius} onChange={setRadius} min={0} disabled={disabled} />
    </Box>
  );
};

export default Uniform;
