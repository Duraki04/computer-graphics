
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf1edfa)

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(6, 5, 9)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        color: 0xe5e0ed,
        side: THREE.DoubleSide
    })
)
ground.rotation.x = -Math.PI / 2

const grid = new THREE.GridHelper(20, 20, 0x9b85bd, 0xc9bfd8)
scene.add(ground, grid)

const ambient = new THREE.AmbientLight(0xffffff, 0.7)
const directional = new THREE.DirectionalLight(0xffffff, 2)
directional.position.set(5, 10, 7)

scene.add(ambient, directional)

const baseMaterial = new THREE.MeshStandardMaterial({
    color: 0x222222,
    metalness: 0.7,
    roughness: 0.3
})

const armMaterial = new THREE.MeshStandardMaterial({
    color: 0x7c3aed,
    metalness: 0.5,
    roughness: 0.3
})

const palmMaterial = new THREE.MeshStandardMaterial({
    color: 0x00bcd4,
    metalness: 0.4,
    roughness: 0.3
})

const fingerMaterial = new THREE.MeshStandardMaterial({
    color: 0x00bcd4,
    metalness: 0.4,
    roughness: 0.3
})

const baseGeometry = new THREE.CylinderGeometry(1.2, 1.2, 0.5, 32)
const base = new THREE.Mesh(baseGeometry, baseMaterial)
scene.add(base)

const shoulder = new THREE.Group()
shoulder.position.y = 0.5
base.add(shoulder)

const shoulderJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    baseMaterial
)
shoulder.add(shoulderJoint)

const upperArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 3, 0.7),
    armMaterial
)
upperArm.position.y = 1.2
shoulder.add(upperArm)

const elbow = new THREE.Group()
elbow.position.y = 2.6
shoulder.add(elbow)

const elbowJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.45, 32, 32),
    baseMaterial
)
elbow.add(elbowJoint)

const foreArm = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 3, 0.6),
    armMaterial
)
foreArm.position.y = 1.25
elbow.add(foreArm)

const wrist = new THREE.Group()
wrist.position.y = 2.8
elbow.add(wrist)

const wristJoint = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    baseMaterial
)
wrist.add(wristJoint)

const palm = new THREE.Mesh(
    new THREE.BoxGeometry(1.8, 1.5, 0.5),
    palmMaterial
)
palm.position.y = 1
wrist.add(palm)

shoulder.rotation.z = THREE.MathUtils.degToRad(-20)
elbow.rotation.z = THREE.MathUtils.degToRad(40)
wrist.rotation.z = THREE.MathUtils.degToRad(-20)


// FINGERS
const fingers = []

const fingerGeometry = new THREE.BoxGeometry(0.25, 1, 0.25)

// Four fingers
for (let i = 0; i < 4; i++) {
    const fingerJoint = new THREE.Group()

    fingerJoint.position.x = -0.55 + i * 0.37
    fingerJoint.position.y = 0.75

    palm.add(fingerJoint)

    const finger = new THREE.Mesh(
        fingerGeometry,
        fingerMaterial
    )

    finger.position.y = 0.5
    fingerJoint.add(finger)

    fingers.push(fingerJoint)
}

// Thumb - positioned on the side
const thumbJoint = new THREE.Group()

thumbJoint.position.set(0.85, 0.05, 0)
thumbJoint.rotation.z = -Math.PI / 3

palm.add(thumbJoint)

const thumb = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 0.85, 0.25),
    fingerMaterial
)

thumb.position.y = 0.4
thumbJoint.add(thumb)

fingers.push(thumbJoint)


const rotationSteps = THREE.MathUtils.degToRad(5)

window.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase()

    if (key === 'q') {
        shoulder.rotation.z += rotationSteps
    }

    if (key === 'a') {
        shoulder.rotation.z -= rotationSteps
    }

    if (key === 'w') {
        elbow.rotation.z += rotationSteps
    }

    if (key === 's') {
        elbow.rotation.z -= rotationSteps
    }

    if (key === 'e') {
        wrist.rotation.z += rotationSteps
    }

    if (key === 'd') {
        wrist.rotation.z -= rotationSteps
    }
})

const orbitControl = new OrbitControls(
    camera,
    renderer.domElement
)

orbitControl.enableDamping = true

window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
})

function animate() {
    requestAnimationFrame(animate)

    orbitControl.update()

    renderer.render(scene, camera)
}

animate()