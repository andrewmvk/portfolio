const fragmentShader = /*glsl*/ `
#ifdef GL_ES
precision mediump float;
#endif

uniform float uIntensity;

varying vec2 vUv;
varying float vDisplacement;
varying vec3 vertexNormal;

void main() {
  vec3 baseColor = vec3(0.612, 0.478, 0.302);
  vec3 atmosphereColor = vec3(0.362, 0.286, 0.125);

  float distort = 0.04 * (0.5 - vDisplacement);
  distort = smoothstep(0.0, 0.4, distort);

  vec3 color = vec3(baseColor - distort);

  //inner atmosphere
  float intensity = 1.0 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
  vec3 atmosphere = vec3(atmosphereColor) * pow(intensity, 2.0) * uIntensity;
  
  gl_FragColor = vec4(atmosphere+color,1.0);
}
`;

export default fragmentShader;
