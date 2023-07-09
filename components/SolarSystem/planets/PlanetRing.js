import { useMemo } from "react";
import * as THREE from "three";

const PlanetRing = ({ radius }) => {
   const ringDust = useMemo(() => {
      const outerRadius = radius + 1;
      const innerRadius = 1;
      let positions = [];
      let sizes = [];
      for (let i = 0; i < 1000; i++) {
         const theta = Math.random() * 2 * Math.PI;

         const x =
            outerRadius * (Math.random() + innerRadius) * Math.cos(theta);
         const y = Math.random() * 0.5 - 0.25;
         const z =
            outerRadius * (Math.random() + innerRadius) * Math.sin(theta);

         const size = 0.05 * Math.random() + 0.02;

         sizes.push(size * 1.5);
         positions.push(x, y, z);
      }

      return {
         positions: new Float32Array(positions),
         sizes: new Float32Array(sizes),
      };
   });

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

			gl_FragColor = vec4( baseColor*brightnessVariation, 1.0 );
		}	
	`;

   const dustVertexShader = /*glsl*/ `
		#ifdef GL_ES
		precision mediump float;
		#endif

		attribute float size;
		//attribute vec3 customColor;

		//varying vec3 vColor;

		void main() {

			//vColor = customColor;

			vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

			gl_PointSize = size * ( 300.0 / -mvPosition.z );

			gl_Position = projectionMatrix * mvPosition;

		}
	`;

   const dustFragmentShader = /*glsl*/ `
		#ifdef GL_ES
		precision mediump float;
		#endif

		//uniform sampler2D uTexture;

		//varying vec3 vColor;

		void main() {
			gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 );
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
            />
         </mesh>
         <points>
            <bufferGeometry attach="geometry">
               <bufferAttribute
                  attach="attributes-position"
                  count={ringDust.positions.length / 3}
                  array={ringDust.positions}
                  itemSize={3}
               />
               {/* <bufferAttribute
						attach="attributes-customColor"
						count={stars.positions.length / 3}
						array={stars.colors}
						itemSize={3}
					/> */}
               <bufferAttribute
                  attach="attributes-size"
                  count={ringDust.sizes.length}
                  array={ringDust.sizes}
                  itemSize={1}
               />
            </bufferGeometry>
            <shaderMaterial
               fragmentShader={dustFragmentShader}
               vertexShader={dustVertexShader}
            />
         </points>
      </group>
   );
};

export default PlanetRing;
