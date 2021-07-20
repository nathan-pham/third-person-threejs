import * as THREE from "https://esm.sh/three"

export default class Player {
    constructor(assets) {
        const asset = assets["FireFighter.fbx"]
        const skin = assets["SimplePeople_FireFighter_Black.png"]

        this.animations = {
            idle: asset.animations[0], 
            turn: assets["Turn.fbx"].animations[0],
            walking: assets["Walking.fbx"].animations[0],
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

            if(previous !== action && previous) {
                previous.fadeOut(0.2)
            }

            action
                .reset()
                .setEffectiveTimeScale(1)
                .setEffectiveWeight(1)
                .fadeIn(0.2)
                .play()

            /*

					previousAction.fadeOut( duration );

				activeAction
					.reset()
					.setEffectiveTimeScale( 1 )
					.setEffectiveWeight( 1 )
					.fadeIn( duration )
					.play();

            
            */
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

    update({controls: {state}}) {
        let [forward, turn] = state
        turn *= -1
        // console.log(forward, turn)
        if(forward > 0.3) {
            this.action = "walking"
        } else if(forward < -0.3) {
            this.action = "walking_backwards"
        } else if(Math.abs(turn) > 0.1) {
            this.action = "turn"
        } else {
            this.action = "idle"
        }
    }
}