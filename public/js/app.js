import Sketch from "./classes/Sketch.js"

import DirectionalLight from "./classes/objects/lights/DirectionalLight.js"
import HemisphereLight from "./classes/objects/lights/HemisphereLight.js"
import Collider from "./classes/objects/colliders/Collider.js"
import Stage from "./classes/objects/colliders/Stage.js"
import Floor from "./classes/objects/floor/Floor.js"
import Grid from "./classes/objects/floor/Grid.js"
import Player from "./classes/objects/player/Player.js"
import PlayerBounds from "./classes/objects/player/PlayerBounds.js"
import Town from "./classes/objects/Town.js"
import * as utils from "/js/utils.js"

// const socket = io()

const sketch = new Sketch({
    container: "#webgl__container", 
    controls: "joystick",
    
    preload: [
        utils.prefixFBX(
            "people/xbot_idle", 
            "anims/jump",
            "anims/running", 
            "anims/walking", 
            "anims/walking_backwards",
            // "anims/turn_left",
            // "anims/turn_right"
        )
    ],
    onLoad: (assets) => {
        const bounds = new PlayerBounds()
        const player = new Player(assets)

        player.bounds = bounds
        bounds.player = player

        sketch.setPlayer(player)
        sketch.add(bounds)
        sketch.render()
    }
})

sketch.add(
    new DirectionalLight(),
    new HemisphereLight(),
    new Floor(),
    // new Grid()
)

for(let x = -5000; x < 5000; x += 1000) {
    for(let z = -5000; z < 5000; z += 1000) {
        if(x == 0 && z == 0) { continue }
        // sketch.add(new Collider([x, 500, z]))
        sketch.add(new Collider([x, 250, z]))
    }
}
sketch.add(new Stage([0, 20, 0]))