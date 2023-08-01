const vertexShader = /*glsl*/ `
	#ifdef GL_ES
	precision mediump float;
	#endif

	varying vec3 vPosition;
	varying vec3 vertexNormal;
	varying vec3 vNormalColor;

	void main() {
		vPosition = position;
		vertexNormal = normalize(normalMatrix * normal);
		vNormalColor = normalMatrix*normal;

		vec4 modelPosition = modelMatrix * vec4(position, 1.0);
		vec4 viewPosition = viewMatrix * modelPosition;
		vec4 projectedPosition = projectionMatrix * viewPosition;

		gl_Position = projectedPosition;
	}
`;

export default vertexShader;
