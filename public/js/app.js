import Sketch from "./classes/Sketch.js"

const socket = io()

const sketch = new Sketch({container: "#webgl__container"})

sketch.render()