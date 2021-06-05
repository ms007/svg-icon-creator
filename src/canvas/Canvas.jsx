import React from 'react'
import { useWindowSize } from '@react-hook/window-size'

import Artboard from './artboard'

import { box } from './Canvas.module.css'

const Canvas = () => {
  const [windowWidth, windowHeight] = useWindowSize({ wait: 50 })

  // ToDo: do not hardcore sidebar values
  // ToDo: too big on big screens?

  const width = windowWidth - 2 * 342 - 160
  const height = windowHeight - 160
  const artboardWidth = width < height ? width : height
  const minSize = 300

  return (
    <div className={box}>
      <Artboard width={artboardWidth >= minSize ? artboardWidth : minSize} />
    </div>
  )
}

export default Canvas
