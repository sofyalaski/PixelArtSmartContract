import React, { useRef } from "react"
import "./styles/drawingPanel.scss"
import Row from "./Row"

import { exportComponentAsPNG } from "react-component-export-image";

export default function DrawingPanel(props) {
  const { width, height, selectedColor } = props
  const panelRef = useRef()

  let rows = []

  for (let i = 0; i < height; i++) {
    rows.push(<Row key={i} width={width} selectedColor={selectedColor} />)
  }

  return (
    <div id="drawingPanel">
      <div id="pixels" ref={panelRef}>
        {rows}
      </div>
      <button onClick={() => exportComponentAsPNG(panelRef,{ fileName:'MyPixelArt.png', html2CanvasOptions: { backgroundColor: null} })} className="button">
        Ready to Export
      </button>
    </div>
  )
}
// taken from this tutorial https://aleksandarpopovic.com/How-to-build-a-Pixel-Art-Drawing-App-in-React/ https://github.com/alekspopovic/pixel-art-drawing-editor