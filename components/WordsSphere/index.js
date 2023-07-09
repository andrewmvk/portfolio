import * as THREE from "three";
import React, {
   useRef,
   useState,
   useMemo,
   useCallback,
   Suspense,
   useEffect,
} from "react";
import {
   Html,
   OrbitControls,
   Point,
   PointMaterial,
   Points,
   Stars,
} from "@react-three/drei";
import { StarCircle, StarTitle } from "./styles";
import Planet from "../Planet";
import { colors, letters } from "../../styles/constants";
import SolarSystem from "../SolarSystem";
import { useFrame, useThree } from "@react-three/fiber";

const Word = ({
   children,
   revealedWord,
   position,
   handleItemClick,
   index,
   distanceFactor,
}) => {
   const [wordData, setWordData] = useState({
      word: children,
      revealed: false,
   });
   const circleRef = useRef();
   const ref = useRef();
   const sSize = 8;

   const over = e => {
      e.stopPropagation();
      document.body.style.cursor = "pointer";
      if (ref.current) ref.current.style.color = colors.highlight;
      if (circleRef.current) circleRef.current.style.transform = "scale(2)";
      if (!wordData.revealed) handleHover();
   };

   const out = () => {
      document.body.style.cursor = "default";
      if (ref.current) ref.current.style.color = "white";
      if (circleRef.current) circleRef.current.style.transform = "scale(1)";
   };

   const handleHover = useCallback(() => {
      let iterations = 0;
      const interval = setInterval(() => {
         let newWord = "";
         for (let j = 0; j < revealedWord.length; j++) {
            if (j < iterations) {
               newWord += revealedWord[j];
            } else {
               newWord += letters[Math.floor(Math.random() * letters.length)];
            }
         }

         setWordData({ word: newWord, revealed: true });
         if (iterations >= revealedWord.length) {
            clearInterval(interval);
         }

         iterations++;
      }, 50);
   }, []);

   return (
      <group position={position}>
         <Point size={sSize} />
         <Html distanceFactor={distanceFactor}>
            <StarCircle ref={circleRef} sSize={sSize} />
            <StarTitle
               ref={ref}
               onClick={() =>
                  handleItemClick({ name: wordData.word, position }, index)
               }
               onPointerOver={over}
               onPointerOut={out}
            >
               {wordData.word}
            </StarTitle>
         </Html>
      </group>
   );
};

const Cloud = React.forwardRef(({ radius = 300, handleItemClick }, ref) => {
   const cloudsRef = useRef();

   // --------- Dynamic stars Configuration --------------

   const words = useMemo(() => {
      const temp = [];
      const spherical = new THREE.Spherical();
      const thetaSpan = Math.PI * 2;
      const phiSpan = Math.PI;

      for (let i = 0; i < ref.current.tools.data.length; i++) {
         let word = "";
         //I know, it's a large name...
         for (let j = 0; j < ref.current.tools.data[i].name.length; j++) {
            word += letters[Math.floor(Math.random() * letters.length)];
         }

         const phi = phiSpan * Math.random();
         const theta = thetaSpan * Math.random();

         const wordPos = new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phi, theta)
         );

         const originalWord = ref.current.tools.data[i].name;
         //This is a array that contains the word position, the 'cryptographic format' of the word and the word itself
         temp.push([wordPos, word, originalWord]);
         //Update the reference so the StarsList and other components can use that
         ref.current.tools.data[i] = {
            ...ref.current.tools.data[i],
            name: originalWord,
            position: wordPos,
         };
      }
      return temp;
   }, [radius]);

   // ----------------------------------------------------

   // --------------- Static stars configuration, random positions, colors and sizes ------------

   const stars = useMemo(() => {
      let positions = [];
      let colors = [];
      let sizes = [];
      for (let i = 0; i < 5000; i++) {
         const theta = Math.random() * 2 * Math.PI;
         const phi = Math.acos(2 * Math.random() - 1);

         const x = Math.cos(theta) * Math.sin(phi);
         const y = Math.sin(theta) * Math.sin(phi);
         const z = Math.cos(phi);

         const size = Math.random();
         const colorShift = (1 + Math.random()) * 0.5;

         sizes.push(size * 1.5);
         colors.push(size * colorShift, size * colorShift, size * colorShift);
         positions.push(x * radius, y * radius, z * radius);
      }

      return {
         positions: new Float32Array(positions),
         colors: new Float32Array(colors),
         sizes: new Float32Array(sizes),
      };
   }, []);

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

   //----------------------------------------------------------------

   return (
      <group ref={cloudsRef}>
         <Points>
            <PointMaterial vertexColors sizeAttenuation />
            {words.map(([pos, word, revealedWord], index) => (
               <Word
                  key={index}
                  index={index}
                  handleItemClick={handleItemClick}
                  revealedWord={revealedWord}
                  position={pos}
                  children={word}
                  distanceFactor={radius / 25}
               />
            ))}
         </Points>
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
      </group>
   );
});

function lerp(prevV, newV, amt = 0.1) {
   return (1 - amt) * prevV + amt * newV;
}

export default React.forwardRef((props, ref) => {
   const cameraRef = useRef();
   const { camera } = useThree();

   useFrame(() => {
      const lookingAtPosition = ref.current.cameraSettings.lookingAt;

      if (lookingAtPosition) {
         const xL = lerp(cameraRef.current.target.x, lookingAtPosition.x, 0.01);
         const yL = lerp(cameraRef.current.target.y, lookingAtPosition.y, 0.01);
         const zL = lerp(cameraRef.current.target.z, lookingAtPosition.z, 0.01);
         cameraRef.current.target = new THREE.Vector3(xL, yL, zL);
         // camera.zoom = lerp(camera.zoom, 5);
         // camera.fov = lerp(camera.fov, 50, 0.01);
      }
   });

   useEffect(() => {
      camera.position.set(20, 20, 20);
      camera.rotation.set(0, 0, 0);
      camera.lookAt(new THREE.Vector3(0, 0, 0));
      camera.fov = 75;
      camera.aspect = 5.510263929618769;
      camera.far = 1000;
      camera.near = 0.1;

      props.setReady();
   }, []);

   return (
      <>
         {/* <ambientLight intensity={0.1} /> */}
         <pointLight position={[0, 0, 0]} />
         <OrbitControls
            ref={cameraRef}
            enableRotate
            enableZoom
            enablePan
            enabled
            maxDistance={220}
            minDistance={20}
         />
         <Suspense fallback={null}>
            <SolarSystem />
            {/* <Planet ref={ref} /> */}
         </Suspense>
         <Cloud
            handleItemClick={props.handleItemClick}
            radius={250}
            ref={ref}
         />
      </>
   );
});
