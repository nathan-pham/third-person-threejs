import {OrbitControls} from "https://esm.sh/three/examples/jsm/controls/OrbitControls"
import {FBXLoader} from "http://esm.sh/three/examples/jsm/loaders/FBXLoader.js"
import * as THREE from "https://esm.sh/three"

import Joystick from "./Joystick.js"

export default class Sketch {
    assets = {}
    objects = []
    clock = new THREE.Clock()

    constructor({container=document.body, controls, preload=[], onLoad}={}) {
        this.container = typeof container == "string" ? document.querySelector(container) : container
        this.dimensions = {width: this.container.offsetWidth, height: this.container.offsetHeight}

        this.createScene()
        this.createCamera()
        this.createRenderer()

        if(controls) {
            this.createControls(controls)
        }

        this.loadAssets(preload.flat(Infinity), onLoad)
        window.addEventListener("resize", this.resize.bind(this))
    }

    loadAssets(preload, onLoad) {
        let assets = []

        const loaders = {
            "fbx": FBXLoader,
            "png": THREE.TextureLoader
        }

        for(const asset of preload) {
            const extension = asset.split(".").pop()
            const name = asset.split("/").pop()
            const loader = new loaders[extension]

            const promise = new Promise(resolve => {
                loader.load(asset, object => {
                    if(extension == "fbx" && !asset.includes("anim")) {
                        object.mixer = new THREE.AnimationMixer(object)
                        object.name = name
    
                        object.traverse(child => {
                            if(child.isMesh) {
                                child.receiveShadow = false
                                child.castShadow = true
    
                                child.material.map = null
                            }
                        })
                    }

                    console.log("loaded", name)
                    
                    resolve(object)
                })
            })

            assets.push({path: asset, promise})
        }

        return Promise.all(assets).then(async () => {
            for(const asset of assets) {
                const {path, promise} = asset
                const name = path.split("/").pop()
                this.assets[name] = await promise
            }

            if(typeof onLoad == "function") {
                onLoad(this.assets)
            }
        })
    }

    get aspect() {
        return this.dimensions.width / this.dimensions.height
    }

    add(...objects) {
        for(const object of objects) {
            this.objects.push(object)
            this.scene.add(object.object || object)
        }
    }
    
    resize() {
        this.dimensions = {width: this.container.offsetWidth, height: this.container.offsetHeight}

        this.camera.aspect = this.aspect
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.dimensions.width, this.dimensions.height)
    }

    createScene() {
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xa0a0a0)
        this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000)
    }

    createCamera() {
        const fov = 45
        const near = 1
        const far = 2000

        this.camera = new THREE.PerspectiveCamera(fov, this.aspect, near, far)
        this.camera.position.set(112, 100, 400)
    }
    
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true})

        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap

        this.renderer.setSize(this.dimensions.width, this.dimensions.height)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.container.appendChild(this.renderer.domElement)
    }
    
    createControls(controls) {
        switch(controls) {
            case "joystick":
                this.controls = new Joystick({container: this.container})
                break

            case "orbit":
            default: 
                this.controls = new OrbitControls(this.camera, this.renderer.domElement)
                this.controls.target.set(0, 0, 0)
                this.controls.update()
                break
        }
        
    }

    render() {
        const delta = this.clock.getDelta()
        this.renderer.render(this.scene, this.camera)

        for(const object of this.objects) {
            if(typeof object.update == "function") {
                object.update(this)
            }

            if(object.mixer) {
                object.mixer.update(delta)
            }
        }

        window.requestAnimationFrame(this.render.bind(this))
    }
}