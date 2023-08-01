import { useMemo } from "react";
import * as THREE from "three";

export default ({ stars }) => {
   const vertexShader = /*glsl*/ `
		#ifdef GL_ES
		precision mediump float;
		#endif

		attribute float size;
		attribute vec3 customColor;

		varying vec3 vColor;

		void main() {

			vColor = customColor;

			vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );

			gl_PointSize = size * ( 300.0 / -mvPosition.z );

			gl_Position = projectionMatrix * mvPosition;

		}
	`;

   const fragmentShader = /*glsl*/ `
		#ifdef GL_ES
		precision mediump float;
		#endif

		uniform sampler2D uTexture;

		varying vec3 vColor;

		void main() {

			gl_FragColor = vec4( vColor, 1.0 ) * texture2D(uTexture, gl_PointCoord );

		}
	`;

   const uniforms = useMemo(
      () => ({
         uTexture: {
            value: new THREE.TextureLoader().load("./disc.png"),
         },
      }),
      []
   );

   return (
      <points position={[0, 0, 0]}>
         <bufferGeometry attach="geometry">
            <bufferAttribute
               attach="attributes-position"
               count={stars.positions.length / 3}
               array={stars.positions}
               itemSize={3}
            />
            <bufferAttribute
               attach="attributes-customColor"
               count={stars.positions.length / 3}
               array={stars.colors}
               itemSize={3}
            />
            <bufferAttribute
               attach="attributes-size"
               count={stars.sizes.length}
               array={stars.sizes}
               itemSize={1}
            />
         </bufferGeometry>
         <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
         />
      </points>
   );
};
