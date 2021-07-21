import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class PlayerBounds {
    constructor() {
        this.object = this.createBounds()
        this.cannon = this.addPhysics()
    }

    createBounds() {
        this.geometry = new THREE.BoxGeometry(100, 300, 100)
        this.material = new THREE.MeshBasicMaterial({color: 0x222222, opacity: 0, transparent: true})

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

        // this.cannon.quaternion.z += -turn * delta
        this.cannon.angularVelocity.set(0, -turn * delta * 400, 0)
        const relative = new CANNON.Vec3(0, 0, z)
        this.cannon.quaternion.vmult(relative, relative)
        this.cannon.position.vadd(relative, this.cannon.position)

// // Use quaternion to rotate the relative vector, store result in same vector
// body.quaternion.vmult(relativeVector, relativeVector);

// // Add position and relative vector, store in body.position
// body.position.vadd(relativeVector, body.position);


        // ship.rigidBody.angularVelocity.z = 1
        // this.cannon.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1,0), (-delta * turn))
        // this.cannon.quaternion.y += -delta * turn
        // this.cannon.quaternion.setFromEuler(
        //     0,
        //    -delta * turn,
        //     0
        // )
        // % Math.sign(this.cannon.quaternion.y)
        // if(Math.round(Math.abs(this.cannon.quaternion.y) * 10) / 10 == 1) {
        //     this.cannon.quaternion.y *= -1
        // }

        this.object.position.copy(this.cannon.position)
        this.object.quaternion.copy(this.cannon.quaternion)
    }

    // update({player, controls, delta}) {
        

        // this.cannon.position.set(this.object.position.x, this.object.position.y, this.object.position.z)
    // }
}