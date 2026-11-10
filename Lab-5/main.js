import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// SCENE
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x101522)

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)

camera.position.set(3, 3, 4)

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)

// LIGHTS
const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.position.set(5, 7, 5)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// CRYSTAL VERTICES
const vertices = new Float32Array([
    // TOP
    0, 2, 0,

    // MIDDLE RING (6 vertices)
    1.2, 0, 0,
    0.6, 0, 1.04,
    -0.6, 0, 1.04,
    -1.2, 0, 0,
    -0.6, 0, -1.04,
    0.6, 0, -1.04,

    // BOTTOM
    0, -2, 0
])

// TRIANGLE INDICES
const indices = []

for (let i = 0; i < 6; i++) {

    const current = i + 1
    const next = ((i + 1) % 6) + 1

    // UPPER TRIANGLES
    indices.push(0, next, current)

    // LOWER TRIANGLES
    indices.push(7, current, next)
}

// BUFFER GEOMETRY
const geometry = new THREE.BufferGeometry()

geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(vertices, 3)
)

geometry.setIndex(indices)

// CALCULATE NORMALS
geometry.computeVertexNormals()

// MATERIAL
const material = new THREE.MeshStandardMaterial({
    color: 0x38aaff,
    metalness: 0.4,
    roughness: 0.3,
    side: THREE.FrontSide,
    flatShading: true
})

// CREATE CRYSTAL
const crystal = new THREE.Mesh(geometry, material)
scene.add(crystal)

// ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.dampingFactor = 0.05

// ANIMATION
function animate() {
    requestAnimationFrame(animate)

    controls.update()

    crystal.rotation.y += 0.005
    crystal.rotation.x += 0.001

    renderer.render(scene, camera)
}

animate()

// RESPONSIVE WINDOW
window.addEventListener('resize', () => {

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()

    renderer.setSize(window.innerWidth, window.innerHeight)
})
