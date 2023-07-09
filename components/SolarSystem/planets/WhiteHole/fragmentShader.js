const fragmentShader = /*glsl*/ `
	#ifdef GL_ES
	precision mediump float;
	#endif

	void main() {
		vec3 color = vec3(1.0,1.0,1.0);

		gl_FragColor = vec4(color, 1.0);
	}
`;

export default fragmentShader;
