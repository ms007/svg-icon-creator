import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useWindowSize } from 'react-use';

import windowAtom from './recoil/window';
import { useTheme, GlobalStyle } from './style';
import { Sidebar, Canvas, Inspector } from './components';

const Main = styled.main`
  display: flex;
  flex-direction: row;
`;

const App = () => {
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
    <ThemeProvider theme={{ mode: theme }}>
      <GlobalStyle />
      <Main>
        <Sidebar />
        <Canvas />
        <Inspector />
      </Main>
    </ThemeProvider>
  );
};

export default App;
