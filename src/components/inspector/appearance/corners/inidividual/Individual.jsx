import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { NumberInput, Corner } from 'components/common';
import {
  withIndividualRadius,
  withIndividualRadiusIncrease,
  withMaxRadius,
} from 'recoil/inspector';

const iconColor = theme('mode', {
  light: '#b4b4b4',
  dark: 'var(--neutral20)',
});

const iconStroke = theme('mode', {
  light: 'var(--neutral50)',
  dark: 'var(--neutral40)',
});

const Container = styled.div`
  display: grid;
  grid-template-columns: max-content max-content;
  grid-template-rows: 28px 28px;
  gap: 12px 16px;
  grid-template-areas:
    'topLeft topRight'
    'bottomLeft bottomRight';
`;

const Area = styled.div`
  grid-area: ${({ name }) => name};
  display: grid;
  grid-template-columns: ${({ name }) =>
    name === 'topLeft' || name === 'bottomLeft' ? '28px 75px' : '75px 28px'};
  gap: 0 12px;
  align-items: center;
`;

const Icon = styled(Corner)`
  color: ${iconColor};
  stroke: ${iconStroke};
  justify-self: center;
`;

const getName = (value) => Object.keys(value)[0];
const getValue = (value) => Object.values(value)[0];

const Individual = () => {
  const [radius, setRadius] = useRecoilState(withIndividualRadius);
  const increaseRadius = useSetRecoilState(withIndividualRadiusIncrease);
  const max = useRecoilValue(withMaxRadius);

  const { topLeft, topRight, bottomLeft, bottomRight } = radius;
  const inputFields = [{ topLeft }, { topRight }, { bottomLeft }, { bottomRight }].map((corner) => {
    const name = getName(corner);
    const label = 'px';
    const value = getValue(corner);
    const multi = value === 'multi';
    const min = 0;
    return { name, label, value, multi, min, max };
  });

  const onChange = (name, value) => {
    if (value === 'multi') {
      return;
    }

    setRadius({ name, value });
  };

  const onIncrement = (name, amount) => {
    increaseRadius({ name, amount });
  };

  const onDecrement = (name, amount) => {
    increaseRadius({ name, amount: -amount });
  };

  return (
    <Container>
      {inputFields.map(({ name, label, multi, value, min, max }) => (
        <Area name={name} key={name}>
          {(name === 'topLeft' || name === 'bottomLeft') && (
            <Icon topLeft={name === 'topLeft'} bottomLeft={name === 'bottomLeft'} height={20} />
          )}

          <NumberInput
            label={label}
            value={value}
            onChange={(value) => onChange(name, value)}
            onIncrement={(amount) => onIncrement(name, amount)}
            onDecrement={(amount) => onDecrement(name, amount)}
            multi={multi}
            min={min}
            max={max}
          />

          {(name === 'topRight' || name === 'bottomRight') && (
            <Icon topRight={name === 'topRight'} bottomRight={name === 'bottomRight'} height={20} />
          )}
        </Area>
      ))}
    </Container>
  );
};

export default Individual;
