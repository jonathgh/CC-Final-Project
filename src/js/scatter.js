import scatterVert from "../shaders/scatter-vert.js";
import scatterFrag from "../shaders/scatter-frag.js";

let canvasW;
let canvasH;
const pointer = new THREE.Vector2();
let timeShift;
let res = new THREE.Vector3();

function main() {
  //credit: https://stackoverflow.com/questions/4037212/html-canvas-full-screen
  const canvas = document.querySelector("#c");
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  canvasW = canvas.width;
  canvasH = canvas.height;
  //end credit

  //credit: https://threejs.org/manual/?q=shader#en/shadertoy
  const uniforms = {
    iTime: { value: 0.0 },
    iResolution: { value: res },
  };

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.autoClearColor = false;

  //add camera, scene, controls
  const camera = new THREE.OrthographicCamera(
    -1, // left
    1, // right
    1, // top
    -1, // bottom
    -1, // near,
    1 // far
  );
  const scene = new THREE.Scene();
  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  //grid helper
  // const size = 10;
  // const divisions = 10;
  // const gridHelper = new THREE.GridHelper(size, divisions);
  // scene.add(gridHelper);

  //add plane to project scatter shader
  const plane = new THREE.PlaneGeometry(2,2);
  const material = new THREE.ShaderMaterial({
    fragmentShader: scatterFrag,
    uniforms,
  });
  scene.add(new THREE.Mesh(plane, material));

  // resize canvas if necessary
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    res.set(window.innerHeight, window.innerWidth, 1.0);
  });

  //animate scatter over time
  function render(time) {
    time *= 0.001; // convert to seconds

    // resizeRendererToDisplaySize(renderer);
    controls.update();
    const canvas = renderer.domElement;

    //set uniforms for shader
    uniforms.iResolution.value.set(canvas.width, canvas.height, 1.0);
    uniforms.iTime.value = time;

    renderer.render(scene, camera);
    // plane.translate(0, 0, 0);
    requestAnimationFrame(render);
  }
  
  requestAnimationFrame(render);
}

//setup mouse interactivity

// document.addEventListener("mousemove", onPointerMove);

// function onPointerMove(event) {
//   timeShift = event.movementX * 0.0000001;
//   //pointer.x = event.clientX / canvasW;
//   //pointer.y = event.clientY / window.innerHeight;
//   // if(pointer.x > 0.7){
//   //   timeShift = 2.0 * pointer.x
//   // } else if (pointer.x < 0.3) {
//   //   timeShift = 1.0 * pointer.x
//   // }

// }

main();
