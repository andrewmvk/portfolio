const atmosphereFragment = /*glsl*/ `
	#ifdef GL_ES
	precision mediump float;
	#endif

	uniform float uIntensity;
	uniform float uGradientFactor;
	uniform vec3 uAtmosphereColor;

	varying vec3 vertexNormal;

	void main() {
		float intensity = pow(uGradientFactor - dot(vertexNormal, vec3(0.0,0.0,1.0)), 2.0);

		gl_FragColor = vec4(uAtmosphereColor, 0.5) * intensity * uIntensity;
	}
`;

export default atmosphereFragment;
