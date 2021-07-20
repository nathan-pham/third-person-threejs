import * as THREE from "https://esm.sh/three"

export default class Floor {
    constructor() {
        this.object = this.createFloor()
    }

    createFloor() {
        this.geometry = new THREE.PlaneBufferGeometry(10000, 10000)
        this.material = new THREE.MeshPhongMaterial({color: 0x999999, depthWrite: false})

        const floor = new THREE.Mesh(this.geometry, this.material)
        floor.rotation.x = -Math.PI / 2
        floor.receiveShadow = true

        return floor
    }
}