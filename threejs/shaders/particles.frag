// particle.frag
precision mediump float;



// void main() {
// 	// pixel color
// 	vec4 colA = texture2D(uTexture, puv);

// 	// greyscale
// 	float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
// 	vec4 colB = vec4(grey, grey, grey, 1.0);

// 	// circle
// 	float border = 0.3;
// 	float radius = 0.5;
// 	float dist = radius - distance(uv, vec2(0.5));
// 	float t = smoothstep(0.0, border, dist);

// 	// final color
// 	color = colB;
// 	color.a = t;

// 	// (...)
// }

uniform vec3 color;

void main() {

	if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;

	gl_FragColor = vec4( color, 1.0 );

}