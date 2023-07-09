const vertexShader = /*glsl*/ `
	#ifdef GL_ES
	precision mediump float;
	#endif
	
	void main() {
		vec4 modelPosition = modelMatrix * vec4(position, 1.0);
		vec4 viewPosition = viewMatrix * modelPosition;
		vec4 projectedPosition = projectionMatrix * viewPosition;

		gl_Position = projectedPosition;
	}
`;

export default vertexShader;
