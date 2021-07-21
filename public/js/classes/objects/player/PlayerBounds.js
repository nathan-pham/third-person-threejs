import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class PlayerBounds {
    constructor() {
        this.object = this.createBounds()
        this.cannon = this.addPhysics()
        this.jump = true
    }

    createBounds(wireframe) {
        this.geometry = new THREE.BoxGeometry(50, 175, 50)
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
        // cube.linearDamping = 0.99

        const contactNormal = new CANNON.Vec3()

        cube.addEventListener("collide", e => {
            const contact = e.contact

            if (contact.bi.id == cube.id) {
                contact.ni.negate(contactNormal)
            } else {
                contactNormal.copy(contact.ni)
            }

            if(contactNormal.dot(new CANNON.Vec3(0, 1, 0)) > 0.5) {
                this.jump = true
                this.player.action = "idle"
            }
        })

        // cube.velocity.mult(0)
        cube.angularVelocity.mult(0)
        return cube
    }

    update({player, controls, delta}) {
        let [forward, turn] = controls.state

        if(!(this.player.currentAnimation == "jump" && !this.jump)) { 
            if(forward == 0 && this.jump) {
                this.player.action = "idle"
            } else if (this.player.currentAnimation == "walking" && forward > 0) {
                const elapsed = Math.abs(Date.now() - this.player.animationTime)
                if(elapsed > 1000) {
                    this.player.action = "running"
                }
            } else if(forward > 0.3 && this.player.currentAnimation !== "running") {
                this.player.action = "walking"
            } else if(forward < 0.3) {
                this.player.action = "walking_backwards"
            }
        } 


        // if(!(Math.abs(turn) <= 0.3)) {
        //     turn /= 5
        // }

        const speed = player.currentAnimation == "running" ? 400 : 150
        const z = speed * delta * (forward > 0 ? 1 : forward < 0 ? -1/3 : 0)
        this.cannon.angularVelocity.set(0, -turn * delta * 500, 0)
        const relative = new CANNON.Vec3(0, 0, z)
        this.cannon.quaternion.vmult(relative, relative)
        this.cannon.position.vadd(relative, this.cannon.position)

        this.object.position.copy(this.cannon.position)
        this.object.quaternion.copy(this.cannon.quaternion)
    }
}