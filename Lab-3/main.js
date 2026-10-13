import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)

camera.position.set(5, 6, 7)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const pointLight = new THREE.PointLight(0xffffff, 400, 0, 1.6)
const ambientLight = new THREE.AmbientLight(0xffffff, 2.3)

scene.add(pointLight, ambientLight)

// SUN
const geometry = new THREE.SphereGeometry(2, 64, 48);

const material = new THREE.MeshBasicMaterial({
    color: 0xffaa22
});

const sun = new THREE.Mesh(geometry, material);
scene.add(sun);

const glowGeometry = new THREE.SphereGeometry(2.25, 64, 48);

const glowMaterial = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide
});

const sunGlow = new THREE.Mesh(glowGeometry, glowMaterial);
sun.add(sunGlow);

// EARTH ORBIT
const earthOrbit = new THREE.Object3D();
sun.add(earthOrbit)

// EARTH
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 64, 48),
    new THREE.MeshStandardMaterial({
        color: 0x287ab8,
        roughness: 0.85,
        metalness: 0.0
    })
)
earth.position.x = 6
earthOrbit.add(earth)

// MOON ORBIT
const moonOrbit = new THREE.Object3D();
earth.add(moonOrbit);

// MOON
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(0.28, 48, 36),
    new THREE.MeshStandardMaterial({
        color: 0x999999,
        roughness: 1.0,
        metalness: 0.0
    })
)
moon.position.x = 1.8
moonOrbit.add(moon)

// MARS ORBIT
const marsOrbit = new THREE.Object3D();
sun.add(marsOrbit)

// MARS
const mars = new THREE.Mesh(
    new THREE.SphereGeometry(0.6, 64, 48),
    new THREE.MeshStandardMaterial({
        color: 0xb85c38,
        roughness: 1.0,
        metalness: 0.0
    })
)
mars.position.x = 9
marsOrbit.add(mars)

// PHOBOS ORBIT
const phobosOrbit = new THREE.Object3D();
mars.add(phobosOrbit)

// PHOBOS
const phobos = new THREE.Mesh(
    new THREE.SphereGeometry(0.18, 48, 36),
    new THREE.MeshStandardMaterial({
        color: 0x81766b,
        roughness: 1.0,
        metalness: 0.0
    })
)
phobos.position.x = 1
phobosOrbit.add(phobos)

// CONTROLS
const control = new OrbitControls(camera, renderer.domElement);


// ANIMATION
function animate() {
    requestAnimationFrame(animate)

    control.update()

    // Earth and Moon
    earthOrbit.rotation.y += 0.005
    moonOrbit.rotation.y += 0.005
    earth.rotation.y += 0.008

    // Mars and Phobos
    marsOrbit.rotation.y += 0.003
    phobosOrbit.rotation.y += 0.005
    mars.rotation.y += 0.007

    // Sun
    sun.rotation.y += 0.002

    renderer.render(scene, camera)
}

animate()