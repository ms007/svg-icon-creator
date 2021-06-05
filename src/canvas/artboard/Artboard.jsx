import React from 'react'

import { box } from './Artboard.module.css'

const Artboard = ({ width }) => {
  return (
    <div className={box} style={{ width, height: width }}>
      Artboard
    </div>
  )
}

export default Artboard
