import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLatest } from 'react-use';

import { NumberInput } from 'components/common';
import { withDimensions, withDimensionsIncrease } from 'recoil/inspector';

const Container = styled.div`
  display: grid;
  grid-template-columns: 75px 75px;
  grid-template-rows: 28px 28px;
  gap: 12px 16px;
  grid-template-areas:
    'width x'
    'height y';
`;

const Area = styled.div`
  grid-area: ${({ name }) => name};
`;

const getName = (dimension) => Object.keys(dimension)[0];
const getValue = (dimension) => Object.values(dimension)[0];

const Dimensions = () => {
  const [dimensions, setDimensions] = useRecoilState(withDimensions);
  const increaseDimensions = useSetRecoilState(withDimensionsIncrease);
  const latestDimensions = useLatest(dimensions);

  const { width, height, x, y } = dimensions;
  const inputFields = [{ width }, { height }, { x }, { y }].map((dimension) => {
    const name = getName(dimension);
    const label = name.charAt(0).toUpperCase();
    const value = getValue(dimension);
    const disabled = value == null || value === '';
    const multi = value === 'multi';
    const min = name === 'width' || name === 'height' ? 1 : null;
    const max = null;
    return { name, label, value, disabled, multi, min, max };
  });

  const onChange = (name, value) => {
    const newDimensions = { ...latestDimensions.current };
    newDimensions[name] = value;
    setDimensions(newDimensions);
  };

  const onIncrement = (name, amount) => {
    increaseDimensions({ name, amount });
  };

  const onDecrement = (name, amount) => {
    increaseDimensions({ name, amount: -amount });
  };

  return (
    <Container>
      {inputFields.map(({ name, label, value, disabled, multi, min, max }) => (
        <Area name={name} key={name}>
          <NumberInput
            label={label}
            value={value}
            onChange={(value) => onChange(name, value)}
            onIncrement={(value) => onIncrement(name, value)}
            onDecrement={(value) => onDecrement(name, value)}
            min={min}
            max={max}
            multi={multi}
            disabled={disabled}
          />
        </Area>
      ))}
    </Container>
  );
};

export default Dimensions;
