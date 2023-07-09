const geometryFragment = /*glsl*/ `

#ifdef GL_ES
precision mediump float;
#endif

uniform float uIntensity;
uniform float uTime;

varying vec2 vUv;
varying vec3 vertexNormal;
varying float vDisplacement;

void main() {
  vec3 baseColor = vec3(0.980 * vUv.x, 0.816 * vUv.y, 0.255 * vUv.z);

  float distort = 2.0 * vDisplacement * uIntensity;
  vec3 color = vec3((sin(distort) + 1.0)*0.65);
  color = mix(baseColor, color, 0.5);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

export default geometryFragment;
