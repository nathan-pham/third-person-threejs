import * as THREE from "https://esm.sh/three"

export default class Collider {
    type = "collider"
    
    constructor(position=[]) {
        this.object = this.createCollider(position)
    }

    createCollider(position) {
        this.geometry = new THREE.BoxGeometry(500, 400, 500)
        this.material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe: true})

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.set(...position)
        return mesh
    }
}