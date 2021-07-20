import * as THREE from "https://esm.sh/three"

export default class Stage {
    constructor(position=[0, 20, 0]) {
        this.object = this.createStage(position)
    }

    createStage(position) {
        this.geometry = new THREE.BoxGeometry(1000, 40, 1000)
        this.material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe: true})

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.set(...position)
        return mesh
    }
}