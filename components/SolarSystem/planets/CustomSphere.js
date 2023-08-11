import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import atmosphereVertex from "../shaders/atmosphereVertex";
import atmosphereFragment from "../shaders/atmosphereFragment";
import PlanetRing from "./PlanetRing";

const CustomSphere = React.forwardRef(
   (
      {
         position = [0, 0, 0],
         uniforms,
         fragmentShader,
         vertexShader,
         radius = 3,
         orbitalSpeed = 0.05,
         ringEnabled = false,
         atmosphere = { enabled: true, scale: 1.1 },
         onClick,
      },
      ref
   ) => {
      const [hovered, setHovered] = useState(false);
      const geometryRef = useRef();
      const groupRef = useRef();
      const meshRef = useRef();

      useEffect(() => {
         document.body.style.cursor = hovered ? "pointer" : "grab";
      }, [hovered]);

      if (ref) {
         //In case it is the sun...
         ref.current.stars.sun = meshRef;
      }

      useFrame(({ clock }) => {
         const t = clock.getElapsedTime();
         const theta = -t * orbitalSpeed * 2 * Math.PI;

         const x = position[2] * Math.cos(theta);
         const y = position[1] * Math.sin(theta); //height
         const z = position[2] * Math.sin(theta);

         groupRef.current.position.set(x, y, z);

         const children = groupRef.current.children;
         children[0].rotation.set(0, t * orbitalSpeed * 30, 0);

         for (let i = 0; i < 1; i++) {
            const uniforms = children[i].material.uniforms;
            uniforms.uTime.value = t * 0.4;
            uniforms.uIntensity.value = THREE.MathUtils.lerp(
               uniforms.uIntensity.value, //start point
               hovered ? 2.0 : 1.0, //end point
               0.02 //interpolation factor
            );
         }
      });

      return (
         <group
            ref={groupRef}
            position={position}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => onClick(groupRef)}
         >
            <mesh ref={meshRef}>
               <icosahedronGeometry args={[radius, 40]} />
               <shaderMaterial
                  ref={geometryRef}
                  vertexShader={vertexShader}
                  fragmentShader={fragmentShader}
                  uniforms={uniforms}
                  toneMapped={false}
               />
            </mesh>
            {atmosphere.enabled ? (
               <mesh scale={atmosphere.scale}>
                  <icosahedronGeometry args={[radius, 20]} />
                  <shaderMaterial
                     vertexShader={atmosphereVertex}
                     fragmentShader={atmosphereFragment}
                     blending={THREE.AdditiveBlending}
                     side={THREE.BackSide}
                     uniforms={uniforms}
                     transparent={true}
                     opacity={0.5}
                     toneMapped={false}
                  />
               </mesh>
            ) : null}
            {ringEnabled ? <PlanetRing radius={radius} /> : null}
         </group>
      );
   }
);

export default CustomSphere;
