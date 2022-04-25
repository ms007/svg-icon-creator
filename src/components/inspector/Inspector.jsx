import React from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';

import { SidePanel } from 'components/common';
import Appearance from './appearance';
import Preview from './preview';

import { inspectorAtom } from 'recoil/inspector';

const Box = styled.div`
  padding: 24px;
`;

const Inspector = () => {
  const { width } = useRecoilValue(inspectorAtom);

  return (
    <SidePanel width={width}>
      <Box>
        <Appearance />
      </Box>
      <Box>
        <Preview />
      </Box>
    </SidePanel>
  );
};

export default Inspector;
