import React from 'react';
import styled from 'styled-components';

import theme from 'styled-theming';
import { useRecoilState } from 'recoil';

import { H5, ToggleButton, Corner, Spacer } from 'components/common';
import Uniform from './uniform';
import Individual from './inidividual';

import { withIndividualRadiusEnabled } from 'recoil/inspector';

const iconColor = theme('mode', {
  light: 'var(--neutral50)',
  dark: 'var(--neutral40)',
});

const Container = styled.div`
  display: grid;
  grid-template-columns: 28px 75px;
  gap: 0 12px;
  grid-template-areas:
    'width x'
    'height y';
`;

const ToggleCornerButton = styled(ToggleButton)`
  height: 28px;
  width: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: ${iconColor};
  background: none;

  &:hover {
    color: var(--body);
    background: none;
  }
`;

const Corners = () => {
  const [individualEnabled, setIndividualEnabled] = useRecoilState(withIndividualRadiusEnabled);

  return (
    <>
      <H5>Corner Radius</H5>

      <Container>
        <ToggleCornerButton
          active={individualEnabled}
          onClick={() => setIndividualEnabled(!individualEnabled)}
        >
          <Corner height={20} />
        </ToggleCornerButton>
        <Uniform disabled={individualEnabled} />
      </Container>

      {individualEnabled && (
        <>
          <Spacer size={12} />
          <Individual />
        </>
      )}
    </>
  );
};

export default Corners;
