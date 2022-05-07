import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

import App from './App';
import DebugObserver from './DebugObserver';

const dndProviderOptions = {
  enableTouchEvents: false,
  enableMouseEvents: true,
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <DndProvider backend={TouchBackend} options={dndProviderOptions}>
        <DebugObserver />
        <App />
      </DndProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
