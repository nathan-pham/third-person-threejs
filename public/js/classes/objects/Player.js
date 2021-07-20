import * as THREE from "https://esm.sh/three"

export default class Player {
    constructor(asset) {
        this.object = this.createPlayer(asset)
    }

    createPlayer(asset) {
        this.mixer = asset.mixer
        this.root = asset.mixer.getRoot()
        
        const action = this.mixer.clipAction(asset.animations[0])
        action.play()

        return asset
    }
}