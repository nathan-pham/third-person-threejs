import * as THREE from "https://esm.sh/three"
import {OrbitControls} from "https://esm.sh/three/examples/jsm/controls/OrbitControls"

export default class Sketch {
    time = 0
    objects = []
    clock = new THREE.Clock()

    constructor({container=document.body, controls}={}) {
        this.container = typeof container == "string" ? document.querySelector(container) : container
        this.dimensions = {width: this.container.offsetWidth, height: this.container.offsetHeight}

        this.createScene()
        this.createCamera()
        this.createRenderer()

        if(controls) {
            this.createControls(controls)
        }

        window.addEventListener("resize", this.resize.bind(this))
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
    }

    createCamera() {
        const fov = 45
        const near = 45
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
            case "orbit":
            default: 
                this.controls = new OrbitControls(this.camera, this.renderer.domElement)
                this.controls.target.set(0, 0, 0)
                this.controls.update()
                break
        }
        
    }

    render() {
        this.time += 0.01
        this.renderer.render(this.scene, this.camera)

        for(const object of this.objects) {
            if(typeof object.update == "function") {
                object.update(this)
            }
        }

        window.requestAnimationFrame(this.render.bind(this))
    }
}