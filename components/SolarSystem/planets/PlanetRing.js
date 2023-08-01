import * as THREE from "three";

const PlanetRing = ({ radius }) => {
   //--------------------------SHADERS------------------------

   const ringVertexShader = /*glsl*/ `
		#ifdef GL_ES
		precision mediump float;
		#endif

		varying vec3 vPosition;

		void main() {
			vPosition = position;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
		}
	`;

   const ringFragmentShader = /*glsl*/ `
		#ifdef GL_ES
		precision mediump float;
		#endif

		varying vec3 vPosition;

		void main() {
			vec3 baseColor = vec3(0.9, 0.9, 0.9);

			vec2 position = vPosition.xy;
			float distance = length(position);
			float brightnessVariation = fract(cos(distance)*5.0)*(-1.0)+1.0;

			gl_FragColor = vec4( baseColor*brightnessVariation, 0.5 );
		}	
	`;

   //----------------------------------------------------------------

   return (
      <group>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius + 1, (radius + 3) * 1.5, 48]} />
            <shaderMaterial
               vertexShader={ringVertexShader}
               fragmentShader={ringFragmentShader}
               side={THREE.DoubleSide}
               transparent
               opacity={0.5}
            />
         </mesh>
      </group>
   );
};

export default PlanetRing;
