import {
  subscribeToData,
  getHeight,
  getWidth,
  objectTransform
} from '@google/dscc'

import drawViz from './viz.js'

const main = () => {
  subscribeToData((message) => {
    const width = getWidth();
    const height = getHeight();
    drawViz(message, width, height)
  }, {transform: objectTransform})
}

main()