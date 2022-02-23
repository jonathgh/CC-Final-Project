// precision mediump float;

// particle.vert

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

// void main() {
// 	// displacement
// 	vec3 displaced = offset;
// 	// randomise
// 	displaced.xy += vec2(random(pindex) - 0.5, random(offset.x + pindex) - 0.5) * uRandom;
// 	float rndz = (random(pindex) + snoise_1_2(vec2(pindex * 0.1, uTime * 0.1)));
// 	displaced.z += rndz * (random(pindex) * 2.0 * uDepth);

// 	// particle size
// 	float psize = (snoise_1_2(vec2(uTime, pindex) * 0.5) + 2.0);
// 	psize *= max(grey, 0.2);
// 	psize *= uSize;

// 	// (...)
// }

// attribute float scale;



// void main() {

// 	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

// 	gl_PointSize = scale * ( 300.0 / - mvPosition.z );

// 	gl_Position = projectionMatrix * mvPosition;

// }
