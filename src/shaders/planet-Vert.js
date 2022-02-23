const planetVert = /*glsl*/  `

precision mediump float;

varying vec2 vUv;
void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
    gl_Position = projectionMatrix * mvPosition;
    vUv = uv;
}

// void main() {
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }
`;

export default planetVert;