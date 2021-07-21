import * as THREE from "https://esm.sh/three"

export default class Town {
    constructor(assets) {
        const asset = assets["town.fbx"]
        this.object = asset
    }
}