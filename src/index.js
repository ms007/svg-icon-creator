import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import App from './App';
import DebugObserver from './DebugObserver';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DebugObserver />
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
