const fragmentShader = /*glsl*/ `
	#ifdef GL_ES
	precision mediump float;
	#endif

	uniform float uTime;
	uniform float uIntensity;
	uniform int uOctaves;

	varying vec3 vPosition;
	varying vec3 vertexNormal;

	float hash(float p) { 
		p = fract(p * 0.011); p *= p + 7.5; p *= p + p; 
		return fract(p); 
	}

	// Based on Morgan McGuire @morgan3d
	// https://www.shadertoy.com/view/4dS3Wd
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

	float fbm(vec3 x) {
		float v = 0.0;
		float a = 0.5;
		vec3 shift = vec3(100);
		for (int i = 0; i < uOctaves; ++i) {
			v += a * noise(x);
			x = x * 2.0 + shift;
			a *= 0.5;
		}
		return v;
	}

	void main() {
		vec3 color = vec3(0.0);

		vec3 q = vec3(0.0);
		q.x = fbm(vPosition);
		q.y = fbm(vPosition + vec3(1.0, 1.0, 1.0));
		q.z = fbm(vPosition + vec3(4.0, 4.0, 4.0));

		vec3 r = vec3(0.0);
		r.x = fbm(vPosition + q + vec3(4.4,7.0,4.2)+ 0.15*uTime);
		r.y = fbm(vPosition + q + vec3(8.8,4.5,2.0)+ 0.126*uTime);
		r.z = fbm(vPosition + q + vec3(3.9,6.9,6.7)+ 0.1*uTime);

		float f = fbm(vPosition + r);

		color = mix(vec3(0.101961,0.619608,0.317),
						vec3(0.4,0.4,0.4),
						clamp((f*f)*4.0,0.0,1.0));

		color = mix(color,
						vec3(0.0,0.0,0.0),
						clamp(length(q),0.0,1.0));

		color = mix(color,
						vec3(0.9,0.9,0.9),
						clamp(length(r.x),0.0,1.0));

		color = mix(color, vec3(0.3,0.3,0.3), 0.5);

		//inner atmosphere
		vec3 atmosphereColor = vec3(0.8,0.8,0.8);
		float intensity = 1.0 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
		vec3 atmosphere = vec3(atmosphereColor) * pow(intensity, 2.0) * uIntensity;

		gl_FragColor = vec4(atmosphere+((f+f) * color), 1.0);
	}
`;

export default fragmentShader;
