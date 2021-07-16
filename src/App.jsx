import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import { useWindowSize } from 'react-use';

import windowAtom from './recoil/window';
import { useTheme, GlobalStyle } from './style';
import { Sidebar, Canvas, Inspector } from './components';

const Box = styled.main`
  display: flex;
  flex-direction: row;
`;

const Main = () => {
  const { width, height } = useWindowSize();
  const { theme, isReady } = useTheme('light');
  const setDimensions = useSetRecoilState(windowAtom);

  useEffect(() => {
    setDimensions({ width, height });
  }, [width, height, setDimensions]);

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
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
