import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RecoilDevTools } from 'recoil-toolkit';
import { TouchBackend } from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd';

import App from './App';
import DebugObserver from './DebugObserver';

const dndProviderOptions = {
  enableTouchEvents: false,
  enableMouseEvents: true,
};

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RecoilDevTools forceSerialize={false} />
      <DndProvider backend={TouchBackend} options={dndProviderOptions}>
        <DebugObserver />
        <App />
      </DndProvider>
    </RecoilRoot>
  </React.StrictMode>
);
