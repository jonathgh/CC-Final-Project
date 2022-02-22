// SCENE
let scene = new THREE.Scene();
scene.background = new THREE.Color('#3f41e2');

// CAMERA
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// RENDERER
let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

// make sure the scene adjusts to the browser window size
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// CONTROLS FOR NAVIGATION
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// GEOMETRY
// ICOSAHEDRON
let icosaGeometry = new THREE.IcosahedronGeometry(1.5, 0);
let icosaMaterial = new THREE.MeshPhongMaterial({ color: 0xaa5e82, roughness: 0.2 });
let mesh = new THREE.Mesh(icosaGeometry, icosaMaterial);
mesh.castShadow = true;
// add the mesh to the scene
scene.add(mesh);

// LIGHTING
// AMBIENT
let ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // (color, intensity)
// add the ambient light to the scene
scene.add(ambientLight);

// POINTLIGHT
let pointLight = new THREE.PointLight(0xc9efff, 0.8);
pointLight.position.set(0, 4, 2);
// shadow settings
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 1;
pointLight.shadow.camera.far = 600;
pointLight.shadow.radius = 10;
// add the point light to the scene
scene.add(pointLight);

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// add the point light helper to the scene
scene.add(pointLightHelper);

// ANIMATE LOOP
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

