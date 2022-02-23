//let glsl = require('glslify');
const pointer = new THREE.Vector2();
let uniforms;
let clock = new THREE.Clock();


import planetVert from "../shaders/planet-Vert.js";
import planetFrag from "../shaders/planet-Frag.js";

uniforms = {
  u_time: { type: "f", value: 1.0 },
  u_resolution: { type: "v2", value: new THREE.Vector2() },
  u_mouse: { type: "v2", value: new THREE.Vector2() }

};

// SCENE
let scene = new THREE.Scene();
scene.background = new THREE.Color('#000'); //#5a1ee2

// CAMERA
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// RENDERER

//credit: https://stackoverflow.com/questions/4037212/html-canvas-full-screen
const canvas = document.querySelector('#c');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
let canvasW = canvas.width;
let canvasH = canvas.height;
//end credit

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// make sure the scene adjusts to the browser window size
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
    const resize = () => {
      pass.uniforms.iResolution.value.set(window.innerWidth, window.innerHeight);
      };
});



document.addEventListener( 'mousemove', onPointerMove );

function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth );
    pointer.y = ( event.clientY / window.innerHeight );

}

document.onmousemove = function(e){
  uniforms.u_mouse.value.x = e.pageX
  uniforms.u_mouse.value.y = e.pageY
}

// CONTROLS FOR NAVIGATION
let controls = new THREE.OrbitControls(camera, renderer.domElement);

// GEOMETRY
// sphere
let sphereGeometry = new THREE.SphereGeometry(3, 50);
const sphereMaterial = new THREE.ShaderMaterial({
  fragmentShader: planetFrag,
  vertexShader: planetVert,
  uniforms: {
    tDiffuse: { type: 't', value: null },
    iResolution: { type: 'v2', value: resolution },
},
  // lights: true
});
// let sphereMaterial = new THREE.MeshStandardMaterial({
//   color: 0xffffff,
//   emissive: 0xffffff,
//   emissiveIntensity: 0.0,
//   roughness: 0.5,
//   metalness: 0.0
// });
//new THREE.MeshPhongMaterial({ color: 0x1100, shininess: 0.2 });
let mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
mesh.castShadow = true;
// add the mesh to the scene
scene.add(mesh);

//////////////////////////////https://stackoverflow.com/questions/69599595/threejs-rotating-starfield/////////////


function addStar () {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({
      color:  0xffffff,
      emissive: 0xffffff,
      emissiveIntensity: 1,
      roughness: 0,
      metalness: 0.5
    });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill(undefined)
      .map(() => THREE.MathUtils.randFloatSpread(1000));

    star.position.set(x, y, z);
    scene.add(star);
  };

  for(let i = 0; i < 1000; i++){
      addStar();
  };

////////////////////////////////End Credit////////////////////


//credit: https://tympanus.net/codrops/2019/01/17/interactive-particles-with-three-js/



// //particles are a simple quad, formed by 4 vertices and 2 triangles.
// const geometry = new THREE.InstancedBufferGeometry();

// // positions
// const positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
// positions.setXYZ(0, -0.5, 0.5, 0.0);
// positions.setXYZ(1, 0.5, 0.5, 0.0);
// positions.setXYZ(2, -0.5, -0.5, 0.0);
// positions.setXYZ(3, 0.5, -0.5, 0.0);
// geometry.setAttribute('position', positions);

// // uvs
// const uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
// uvs.setXYZ(0, 0.0, 0.0);
// uvs.setXYZ(1, 1.0, 0.0);
// uvs.setXYZ(2, 0.0, 1.0);
// uvs.setXYZ(3, 1.0, 1.0);
// geometry.setAttribute('uv', uvs);

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

// geometry.setAttribute('pindex', new THREE.InstancedBufferAttribute(indices, 1, false));
// geometry.setAttribute('offset', new THREE.InstancedBufferAttribute(offsets, 3, false));
// geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1, false));

// const uniforms = {
// 	uTime: { value: 0 },
// 	uRandom: { value: 1.0 },
// 	uDepth: { value: 2.0 },
// 	uSize: { value: 0.0 },
// 	uTextureSize: { value: new THREE.Vector2(this.width, this.height) },
// 	uTexture: { value: this.texture },
// 	uTouch: { value: null }
// };

// const material = new THREE.ShaderMaterial({
// 	uniforms,
// 	vertexShader: vertexShader,  //document.getElementById( 'vertexShader' ).textContent, // vertexShader: glslify(require('../shaders/particles.vert')),
// 	fragmentShader: fragmentShader, //document.getElementById( 'fragmentShader' ).textContent, // fragmentShader: glslify(require('../shaders/particle.frag')),
// 	depthTest: false,
// 	transparent: true
// });

//end credit/////////

// LIGHTING
// AMBIENT
// let ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // (color, intensity)
// // add the ambient light to the scene
// scene.add(ambientLight);

// POINTLIGHT
let pointLight = new THREE.PointLight(0xc9efff, 5.0);
pointLight.position.set(0, 5, 2);

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
  uniforms.u_time.value += clock.getDelta();  
  requestAnimationFrame(animate);
    renderer.render(scene, camera);
    camera.lookAt(scene.position);

    camera.position.y = THREE.MathUtils.lerp(camera.position.y, (pointer.x * Math.PI) / 5, 0.1);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, (pointer.y * Math.PI) / 5, 0.1); 

}
animate();

