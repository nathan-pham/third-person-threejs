import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class PlayerBounds {
    constructor() {
        this.object = this.createBounds(true)
        this.cannon = this.addPhysics()
    }

    createBounds(wireframe) {
        this.geometry = new THREE.BoxGeometry(100, 300, 100)
        this.material = wireframe
            ? new THREE.MeshBasicMaterial({color: 0x222222, wireframe:true})
            : new THREE.MeshBasicMaterial({color: 0x222222, opacity: 0, transparent: true})
        //  
        const bounds = new THREE.Mesh(this.geometry, this.material)
        bounds.position.y = (this.geometry.parameters.height / 2) + 100
        return bounds
    }

    addPhysics() {
        const {width, height, depth} = this.geometry.parameters

        const cube = new CANNON.Body({
            mass: 75,
            shape: new CANNON.Box(new CANNON.Vec3(width / 2, height / 2, depth / 2)),
        })
        cube.position.copy(this.object.position)
        cube.angularDamping = 0.99
        cube.linearDamping = 0.99

        // cube.velocity.mult(0)
        cube.angularVelocity.mult(0)
        return cube
    }

    update({player, controls, delta}) {
        const [forward, turn] = controls.state
        const speed = player.currentAnimation == "running" ? 400 : 150
        const z = speed * delta * (forward > 0 ? 1 : forward < 0 ? -1/3 : 0)

        this.cannon.angularVelocity.set(0, -turn * delta * 400, 0)
        const relative = new CANNON.Vec3(0, 0, z)
        this.cannon.quaternion.vmult(relative, relative)
        this.cannon.position.vadd(relative, this.cannon.position)

        this.object.position.copy(this.cannon.position)
        this.object.quaternion.copy(this.cannon.quaternion)
    }
}