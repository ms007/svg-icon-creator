import React from 'react';
import styled from 'styled-components';
import { useWindowSize } from 'react-use';
import { useRecoilState } from 'recoil';

import { sideBarState, inspectorState } from '../../state/size.state';
import Artboard from './artboard';

const Box = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.canvas.background};
  color: ${(props) => props.theme.canvas.color};
`;

const Canvas = () => {
  const [sidebarWidth] = useRecoilState(sideBarState);
  const [inspectorWidth] = useRecoilState(inspectorState);
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const margin = 80;

  // ToDo: too big on big screens?

  const width = windowWidth - sidebarWidth - inspectorWidth - margin * 2;
  const height = windowHeight - margin * 2;
  const artboardWidth = width < height ? width : height;
  const minSize = 300;

  return (
    <Box>
      <Artboard
        width={artboardWidth >= minSize ? artboardWidth : minSize}
        margin={margin}
      />
    </Box>
  );
};

export default Canvas;
