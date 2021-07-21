import * as CANNON from "https://esm.sh/cannon"
import * as THREE from "https://esm.sh/three"

export default class Floor {
    type = "floor"

    constructor() {
        this.object = this.createFloor()
        this.cannon = this.addPhysics()
    }

    createFloor() {
        this.geometry = new THREE.PlaneBufferGeometry(10000, 10000)
        this.material = new THREE.MeshPhongMaterial({color: 0x999999, depthWrite: false})

        const floor = new THREE.Mesh(this.geometry, this.material)
        floor.rotation.x = -Math.PI / 2
        floor.receiveShadow = true

        return floor
    }

    addPhysics() {
        const plane = new CANNON.Body({
            mass: 0,
            shape: new CANNON.Plane()
        })
        plane.quaternion.setFromEuler(-Math.PI / 2, 0, 0) 
        
        return plane
    }
}