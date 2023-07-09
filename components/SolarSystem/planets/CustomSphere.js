import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";
import atmosphereVertex from "../shaders/atmosphereVertex";
import atmosphereFragment from "../shaders/atmosphereFragment";
import PlanetRing from "./PlanetRing";

const CustomSphere = ({
   position = [0, 0, 0],
   uniforms,
   fragmentShader,
   vertexShader,
   radius = 3,
   orbitalSpeed = 0.05,
   ringEnabled = false,
   atmosphere = { enabled: true, scale: 1.1 },
}) => {
   const hover = useRef(false);
   const geometryRef = useRef();
   const atmosphereRef = useRef();
   const groupRef = useRef();

   useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      const theta = -t * orbitalSpeed * 2 * Math.PI;

      const x = position[2] * Math.cos(theta);
      const y = position[1] * Math.sin(theta); //height
      const z = position[2] * Math.sin(theta);

      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.set(0, t * orbitalSpeed * 25, 0);

      const children = groupRef.current.children;
      for (let i = 0; i < 1; i++) {
         const uniforms = children[i].material.uniforms;
         uniforms.uTime.value = t * 0.4;
         uniforms.uIntensity.value = THREE.MathUtils.lerp(
            uniforms.uIntensity.value, //start point
            hover.current ? 1.2 : 1.0, //end point
            0.02 //interpolation factor
         );
      }
   });

   return (
      <group
         ref={groupRef}
         position={position}
         onPointerOver={() => (hover.current = true)}
         onPointerOut={() => (hover.current = false)}
      >
         <mesh>
            <icosahedronGeometry args={[radius, 40]} />
            <shaderMaterial
               ref={geometryRef}
               vertexShader={vertexShader}
               fragmentShader={fragmentShader}
               uniforms={uniforms}
            />
         </mesh>
         {atmosphere.enabled ? (
            <mesh
               scale={atmosphere.scale}
               onPointerOver={() => (hover.current = true)}
               onPointerOut={() => (hover.current = false)}
            >
               <icosahedronGeometry args={[radius, 20]} />
               <shaderMaterial
                  ref={atmosphereRef}
                  vertexShader={atmosphereVertex}
                  fragmentShader={atmosphereFragment}
                  blending={THREE.AdditiveBlending}
                  side={THREE.BackSide}
                  uniforms={uniforms}
                  transparent={true}
                  opacity={0.5}
               />
            </mesh>
         ) : null}
         {ringEnabled ? <PlanetRing radius={radius} /> : null}
      </group>
   );
};

export default CustomSphere;
