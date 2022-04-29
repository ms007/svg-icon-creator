import React from 'react';
import styled from 'styled-components';
import theme from 'styled-theming';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useLatest } from 'react-use';

import { NumberInput, Corner } from 'components/common';
import { withIndividualRadius, withMaxRadius } from 'recoil/inspector';

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
  grid-template-columns: 114px 114px;
  grid-template-rows: 28px 28px;
  gap: 12px 16px;
  grid-template-areas:
    'topLeft topRight'
    'bottomLeft bottomRight';
`;

const Area = styled.div`
  grid-area: ${({ name }) => name};
  display: flex;
  align-items: center;
`;

const Input = styled.div`
  width: 80px;
  margin-left: ${({ name }) => (name.includes('Left') ? 0 : '14px')};
  margin-right: ${({ name }) => (name.includes('Right') ? 0 : '14px')};
`;

const Icon = styled(Corner)`
  color: ${iconColor};
  stroke: ${iconStroke};
`;

const getName = (value) => Object.keys(value)[0];
const getValue = (value) => Object.values(value)[0];

const Individual = () => {
  const [radius, setRadius] = useRecoilState(withIndividualRadius);
  const max = useRecoilValue(withMaxRadius);
  const latestRadius = useLatest(radius);

  const { topLeft, topRight, bottomLeft, bottomRight } = radius;
  const inputFields = [{ topLeft }, { topRight }, { bottomLeft }, { bottomRight }].map((corner) => {
    const name = getName(corner);
    const label = 'px';
    const value = getValue(corner);
    const min = 0;
    return { name, label, value, min, max };
  });

  const onChange = (name, value) => {
    const newRadius = { ...latestRadius.current };
    newRadius[name] = value;
    setRadius(newRadius);
  };

  return (
    <Container>
      {inputFields.map(({ name, label, value, min, max }) => (
        <Area name={name} key={name}>
          {(name === 'topRight' || name === 'bottomRight') && (
            <Icon topRight={name === 'topRight'} bottomRight={name === 'bottomRight'} height={20} />
          )}

          <Input name={name}>
            <NumberInput
              label={label}
              value={value}
              onChange={(value) => onChange(name, value)}
              min={min}
              max={max}
            />
          </Input>

          {(name === 'topLeft' || name === 'bottomLeft') && (
            <Icon topLeft={name === 'topLeft'} bottomLeft={name === 'bottomLeft'} height={20} />
          )}
        </Area>
      ))}
    </Container>
  );
};

export default Individual;
