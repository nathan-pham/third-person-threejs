import Sketch from "./classes/Sketch.js"

import DirectionalLight from "./classes/objects/lights/DirectionalLight.js"
import AmbientLight from "./classes/objects/lights/AmbientLight.js"
import Cube from "./classes/objects/Cube.js"

const socket = io()

const sketch = new Sketch({container: "#webgl__container", controls: true})

sketch.add(
    new DirectionalLight(),
    new AmbientLight(),
    new Cube()
)

sketch.render()