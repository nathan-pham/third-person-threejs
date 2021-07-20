import {FBXLoader} from "http://esm.sh/three/examples/jsm/loaders/FBXLoader.js"
import * as THREE from "https://esm.sh/three"

export default class Player {
    constructor() {
        this.object = this.createPlayer()
    }

    createPlayer() {
        const loader = new THREE.FBXLoader()
        
    }
}