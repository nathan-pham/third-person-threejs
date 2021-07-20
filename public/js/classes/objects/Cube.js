import * as THREE from "https://esm.sh/three"

export default class Cube {
    constructor() {
        this.object = createCube()
    }

    createCube() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1)
        this.material = new THREE.MeshPhongMaterial({color: 0x00aaff})
        return new THREE.Mesh(this.geometry, this.material)
    }
}