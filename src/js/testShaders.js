import scatterVert from "../shaders/scatter-Vert.js";
import scatterFrag from "../shaders/scatter-Frag.js";

function main() {
    const canvas = document.querySelector('#c');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    let canvasW = canvas.width;
    let canvasH = canvas.height;

    const uniforms = {
        iTime: { value: 0 },
        iResolution:  { value: new THREE.Vector3() },
      };

    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.autoClearColor = false;
   
    const camera = new THREE.OrthographicCamera(
      -1, // left
       1, // right
       1, // top
      -1, // bottom
      -1, // near,
       1, // far
    );
    const scene = new THREE.Scene();
    const plane = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
        fragmentShader: scatterFrag,
        uniforms,
      });


    scene.add(new THREE.Mesh(plane, material));
   
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }
   
    function render(time) {
    
      time *= 0.001;  // convert to seconds
      resizeRendererToDisplaySize(renderer);
   
      const canvas = renderer.domElement;
      uniforms.iResolution.value.set(canvas.width, canvas.height, 1);
      uniforms.iTime.value = time;


      renderer.render(scene, camera);
   
      requestAnimationFrame(render);
    }
   
    requestAnimationFrame(render);
  }
   
  main();