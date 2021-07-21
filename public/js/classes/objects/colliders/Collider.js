import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class Collider {
    type = "collider"
    
    constructor(position=[]) {
        this.object = this.createCollider(position)
        this.cannon = this.addPhysics()
    }

    createCollider(position) {
        this.geometry = new THREE.BoxGeometry(500, 500, 500)
        this.material = new THREE.MeshBasicMaterial({color: 0x222222, wireframe: true})

        const mesh = new THREE.Mesh(this.geometry, this.material)
        mesh.position.set(...position)
        return mesh
    }

    addPhysics() {
        const {width, height, depth} = this.geometry.parameters
        
        const cube = new CANNON.Body({
            mass: 10000,
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)),
        })
        cube.position.copy(this.object.position)

        return cube
    }

    update() {
        this.object.position.copy(this.cannon.position)
        this.object.quaternion.copy(this.cannon.quaternion)
    }
}