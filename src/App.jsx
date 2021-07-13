import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { useWindowSize } from 'react-use';

import { windowState } from './state/size.state';
import { useTheme, GlobalStyle } from './style';
import { Sidebar, Canvas, Inspector } from './components';

const Box = styled.main`
  display: flex;
  flex-direction: row;
`;

const Main = () => {
  const { width, height } = useWindowSize();
  const { values, isReady } = useTheme('dark');
  const setDimensions = useSetRecoilState(windowState);

  useEffect(() => {
    setDimensions({ width, height });
  }, [width, height, setDimensions]);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={values}>
      <GlobalStyle />
      <Box>
        <Sidebar />
        <Canvas />
        <Inspector />
      </Box>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <Main />
    </RecoilRoot>
  );
};

export default App;
