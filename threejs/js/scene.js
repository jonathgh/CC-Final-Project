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

//credit: https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/

// //particles are a simple quad, formed by 4 vertices and 2 triangles.
// const geometry = new THREE.InstancedBufferGeometry();

// // positions
// const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
// positions.setXYZ(0, -0.5, 0.5, 0.0);
// positions.setXYZ(1, 0.5, 0.5, 0.0);
// positions.setXYZ(2, -0.5, -0.5, 0.0);
// positions.setXYZ(3, 0.5, -0.5, 0.0);
// geometry.addAttribute('position', positions);

// // uvs
// const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
// uvs.setXYZ(0, 0.0, 0.0);
// uvs.setXYZ(1, 1.0, 0.0);
// uvs.setXYZ(2, 0.0, 1.0);
// uvs.setXYZ(3, 1.0, 1.0);
// geometry.addAttribute('uv', uvs);

// // index
// geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([ 0, 2, 1, 2, 3, 1 ]), 1));

// //loop through the pixels of the image and assign our instanced attributes.
// const indices = new Uint16Array(this.numPoints);
// const offsets = new Float32Array(this.numPoints * 3);
// const angles = new Float32Array(this.numPoints);

// for (let i = 0; i < this.numPoints; i++) {
// 	offsets[i * 3 + 0] = i % this.width;
// 	offsets[i * 3 + 1] = Math.floor(i / this.width);

// 	indices[i] = i;

// 	angles[i] = Math.random() * Math.PI;
// }

// geometry.addAttribute('pindex', new THREE.InstancedBufferAttribute(indices, 1, false));
// geometry.addAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3, false));
// geometry.addAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1, false));

// const uniforms = {
// 	uTime: { value: 0 },
// 	uRandom: { value: 1.0 },
// 	uDepth: { value: 2.0 },
// 	uSize: { value: 0.0 },
// 	uTextureSize: { value: new THREE.Vector2(this.width, this.height) },
// 	uTexture: { value: this.texture },
// 	uTouch: { value: null }
// };

// const material = new THREE.RawShaderMaterial({
// 	uniforms,
// 	vertexShader: glslify(require('../../../shaders/particle.vert')),
// 	fragmentShader: glslify(require('../../../shaders/particle.frag')),
// 	depthTest: false,
// 	transparent: true
// });

//end credit/////////

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

