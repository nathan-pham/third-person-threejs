import * as THREE from "https://esm.sh/three"

export default class Player {
    constructor(assets) {
        const asset = assets["FireFighter.fbx"]
        const skin = assets["SimplePeople_FireFighter_Black.png"]

        this.object = this.createPlayer(asset, skin)
    }

    createPlayer(asset, skin) {
        this.mixer = asset.mixer
        this.root = asset.mixer.getRoot()
        
        const action = this.mixer.clipAction(asset.animations[0])
        action.play()

        if(skin) {
            asset.traverse(child => {
                if(child.isMesh) {
                    child.material.map = skin
                }
            })
        }

        return asset
    }
}