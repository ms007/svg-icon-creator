import React from 'react';
import { RecoilRoot } from 'recoil';
import styled, { ThemeProvider } from 'styled-components';

import { useTheme, GlobalStyle } from './style';
import { Sidebar, Canvas, Inspector } from './components';

const Box = styled.main`
  display: flex;
  flex-direction: row;
`;

const Main = () => {
  const { values, isReady } = useTheme('dark');
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
