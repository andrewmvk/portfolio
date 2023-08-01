const fragmentShader = /*glsl*/ `
	#ifdef GL_ES
	precision mediump float;
	#endif

	uniform float uTime;
	uniform float uIntensity;
	uniform vec3 uAtmosphereColor;
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
		q.z = fbm(vPosition + vec3(2.0, 2.0, 2.0));

		vec3 r = vec3(0.0);
		r.x = fbm(vPosition + 1.0*q + vec3(1.7,9.2,5.2)+ 0.15*uTime);
		r.y = fbm(vPosition + 1.0*q + vec3(8.3,2.8,1.9)+ 0.126*uTime);
		r.z = fbm(vPosition + 1.0*q + vec3(3.7,6.1,3.5)+ 0.1*uTime);

		float f = fbm(vec3(cos(vPosition.y*2.5)) + r*1.5);

		color = mix(vec3(0.0), vec3(1.0), clamp((f*f*f)*4.0,0.0,1.0));

		vec3 baseColor = vec3(0.94, 0.43, 0.22);
	 	vec3 secondColor = vec3(0.99, 0.74, 0.36);
		
		vec3 baseColorMix = baseColor*(1.0-color);
		vec3 secondColorMix = secondColor*color;

		//inner atmosphere
		float intensity = 1.0 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
		vec3 atmosphere = uAtmosphereColor * pow(intensity, 2.0) * uIntensity * 0.5;

		gl_FragColor = vec4(baseColorMix+secondColorMix+atmosphere, 1.0);
	}

	// void main() {
	// 	float frequency = 3.0;

	// 	vec3 baseColor = vec3(0.94, 0.43, 0.22);
	// 	vec3 secondColor = vec3(0.99, 0.74, 0.36);

	// 	//gray scale (black and white)
	// 	float wave = sin(vPosition.y*frequency);
	// 	vec3 color = vec3(smoothstep(0.4,0.8,wave));

	// 	vec3 baseColorMix = baseColor*color;
	// 	vec3 secondColorMix = secondColor*(1.0-color);

	// 	//inner atmosphere
	// 	vec3 atmosphereColor = baseColor*0.5;

	// 	float intensity = 1.0 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
	// 	vec3 atmosphere = vec3(atmosphereColor) * pow(intensity, 2.0) * uIntensity;

	// 	gl_FragColor = vec4(atmosphere + baseColorMix + secondColorMix, 1.0);
	// }
`;

export default fragmentShader;
