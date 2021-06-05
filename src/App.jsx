import React from 'react'

import Sidebar from './sidebar'
import Canvas from './canvas'
import Inspector from './inspector'

import { container } from './App.module.css'

const App = () => {
  return (
    <div className={container}>
      <Sidebar />
      <Canvas />
      <Inspector />
    </div>
  )
}

export default App
