import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import artboardAtom, { withWidth } from 'recoil/artboard';
import presetsAtom from 'recoil/presets';

import Grid from './Grid';

const Box = styled.div`
  margin: ${(props) => `${props.margin}px`};
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
  background-color: ${(props) => props.theme.artboard.background};
  box-shadow: ${(props) => `0 0 2px 0 ${props.theme.artboard.boxShadow}`};
  border-radius: 2px;
  color: ${(props) => props.theme.artboard.color};
`;

const Artboard = () => {
  const { margin } = useRecoilValue(artboardAtom);
  const { size } = useRecoilValue(presetsAtom);
  const width = useRecoilValue(withWidth);

  const viewBox = `0 0 ${size} ${size}`;

  return (
    <Box width={width} margin={margin}>
      <svg width={width} height={width} viewBox={viewBox}>
        <Grid size={size} />
      </svg>
    </Box>
  );
};

export default Artboard;
