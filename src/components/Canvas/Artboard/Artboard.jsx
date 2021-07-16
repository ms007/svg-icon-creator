import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import artboardAtom, { withWidth } from 'recoil/artboard';
import presetsAtom from 'recoil/artboard';

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
        <rect x="0" y="2" width="4" height="6" />
      </svg>
    </Box>
  );
};

export default Artboard;
