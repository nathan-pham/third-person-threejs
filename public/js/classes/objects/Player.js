import * as THREE from "https://esm.sh/three"

export default class Player {
    constructor(assets) {
        const asset = assets["FireFighter.fbx"]
        const skin = assets["SimplePeople_FireFighter_Black.png"]

        this.animations = {idle: asset.animations[0], walking: assets["Walking.fbx"].animations[0]}
        // console.log(this.animations)
        this.currentAnimation = "idle"

        this.object = this.createPlayer(asset, skin)
    }

    setAction(name="idle") {
        const action = this.mixer.clipAction(this.animations[name]) 
        this.currentAnimation = name

        action.time = 0
        this.mixer.stopAllAction()
        action.fadeIn(0.5)
        action.play()
    }

    createPlayer(asset, skin) {
        this.mixer = asset.mixer
        this.root = asset.mixer.getRoot()

        this.setAction("walking")

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