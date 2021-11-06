import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import App from './App';
import DebugObserver from './DebugObserver';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DndProvider backend={HTML5Backend}>
        <DebugObserver />
        <App />
      </DndProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
