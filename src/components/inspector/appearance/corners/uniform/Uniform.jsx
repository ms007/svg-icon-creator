import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { NumberInput } from 'components/common';
import { withUniformRadius, withUniformRadiusIncrease, withMaxRadius } from 'recoil/inspector';

const Box = styled.div`
  height: 28px;
`;

const Uniform = ({ disabled }) => {
  const [radius, setRadius] = useRecoilState(withUniformRadius);
  const increaseRadius = useSetRecoilState(withUniformRadiusIncrease);
  const max = useRecoilValue(withMaxRadius);

  const onChange = (value) => {
    if (value === 'multi') {
      return;
    }

    setRadius(value);
  };

  const onIncrement = (amount) => {
    increaseRadius(amount);
  };

  const onDecrement = (amount) => {
    increaseRadius(-amount);
  };

  return (
    <Box>
      <NumberInput
        label="px"
        value={radius}
        onChange={onChange}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        min={0}
        max={max}
        multi={radius === 'multi'}
        disabled={disabled}
      />
    </Box>
  );
};

export default Uniform;
