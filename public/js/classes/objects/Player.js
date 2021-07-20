import * as THREE from "https://esm.sh/three"

export default class Player {
    constructor(assets) {
        const asset = assets["FireFighter.fbx"]
        const skin = assets["SimplePeople_FireFighter_Black.png"]

        this.animations = {
            idle: asset.animations[0], 
            turn: assets["Turn.fbx"].animations[0],
            walking: assets["Walking.fbx"].animations[0],
            running: assets["Running.fbx"].animations[0],
            walking_backwards: assets["Walking Backwards.fbx"].animations[0]
        }

        this.object = this.createPlayer(asset, skin)
    }

    set action(name="idle") {
        if(this.currentAnimation !== name) {
            let previous
            if(this.currentAnimation) {
                previous = this.mixer.clipAction(this.animations[this.currentAnimation])
            }

            const action = this.mixer.clipAction(this.animations[name]) 
            this.currentAnimation = name
            this.animationTime = Date.now()

            if(previous !== action && previous) {
                previous.fadeOut(0.2)
            }

            action
                .reset()
                .setEffectiveTimeScale(1)
                .setEffectiveWeight(1)
                .fadeIn(0.2)
                .play()
        }
    }

    createPlayer(asset, skin) {
        this.mixer = asset.mixer
        this.root = asset.mixer.getRoot()

        this.action = "idle"

        if(skin) {
            asset.traverse(child => {
                if(child.isMesh) {
                    child.material.map = skin
                }
            })
        }

        return asset
    }

    // update(sketch) {
    //     let [forward, turn] = sketch.controls.state
    //     turn *= -1

    //     // manage animations
    //     if(this.currentAnimation == "walking" || this.currentAnimation == "running" && forward > 0) {
    //         const elapsed = Date.now() - this.animationTime
    //         if(elapsed > 1000) {
    //             this.action = "running"
    //         }
    //     } else if(forward > 0.3) {
    //         this.action = "walking"
    //     } else if(forward < -0.3) {
    //         this.action = "walking_backwards"
    //     } else if(Math.abs(turn) > 0.1) {
    //         this.action = "turn"
    //     } else {
    //         this.action = "idle"
    //     }

    //     // move player according to animations
    //     // console.log(this.object.position.z)
    //     // if(forward > 0.3) {
    //     //     const speed = this.currentAnimation == "running" ? 400 : 150
    //     //     this.object.translateZ(sketch.delta * speed)
    //     // } else if(forward < -0.3) {
    //     //     this.object.translateZ(-sketch.delta * 30)
    //     // }
    //     // this.object.rotateY(turn * sketch.delta)

    //     // manage camera
    //     if(sketch.activeCamera) {
    //         sketch.camera.position.lerp(sketch.activeCamera.getWorldPosition(new THREE.Vector3()), 0.05)
    //         const position = this.object.position.clone()
    //         position.y += 200
    //         sketch.camera.lookAt(position)
    //     }
    // }
}