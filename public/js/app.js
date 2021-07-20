import Sketch from "./classes/Sketch.js"

import DirectionalLight from "./classes/objects/lights/DirectionalLight.js"
import HemisphereLight from "./classes/objects/lights/HemisphereLight.js"
import AmbientLight from "./classes/objects/lights/AmbientLight.js"
import Floor from "./classes/objects/floor/Floor.js"
import Grid from "./classes/objects/floor/Grid.js"
import Player from "./classes/objects/Player.js"

const socket = io()

const sketch = new Sketch({
    container: "#webgl__container", 
    controls: "orbit",
    preload: [

    ]
})

sketch.add(
    new DirectionalLight(),
    new HemisphereLight(),
    new AmbientLight(),
    new Floor(),
    new Grid()
)

sketch.render()