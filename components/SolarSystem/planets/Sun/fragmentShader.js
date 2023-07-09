const fragmentShader = /*glsl*/`
	#ifdef GL_ES
	precision mediump float;
	#endif

	uniform float uIntensity;
	uniform int uOctaves;

	varying float vDisplacement;

	void main() {
		vec3 yellow = vec3(1.0, 0.631, 0.051);
		vec3 red = vec3(1.0, 0.317, 0.035);

		vec3 color = vec3(red + smoothstep(0.1, 0.9, (vDisplacement / float(uOctaves)) * yellow));

		gl_FragColor = vec4(color, 1.0);
	}
`

export default fragmentShader;