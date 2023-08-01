const vertexShader = /*glsl*/ `
	#ifdef GL_ES
	precision mediump float;
	#endif

	uniform float uTime;
	uniform int uOctaves;

	varying float vDisplacement;

	float hash(float p) { 
		p = fract(p * 0.011); p *= p + 7.5; p *= p + p; 
		return fract(p); 
	}

	float noise(vec3 x) {
		const vec3 step = vec3(110, 241, 171);

		vec3 i = floor(x);
		vec3 f = fract(x);
	
		// For performance, compute the base input to a 1D hash from the integer part of the argument and the 
		// incremental change to the 1D based on the 3D -> 1D wrapping
		float n = dot(i, step);

		vec3 u = f * f * (3.0 - 2.0 * f);
		return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x),
							mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y),
						mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x),
							mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z);
	}    

	void main() {
		float frequency = 1.0;

		for(int i=0; i < uOctaves; i++) {
			vDisplacement += noise(position * frequency + 2.0 * uTime);
			frequency *= 1.2;
		}

		vec3 newPosition = position + normal * (0.07 * vDisplacement);

		vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
		vec4 viewPosition = viewMatrix * modelPosition;
		vec4 projectedPosition = projectionMatrix * viewPosition;

		gl_Position = projectedPosition;
	}
`;

export default vertexShader;
