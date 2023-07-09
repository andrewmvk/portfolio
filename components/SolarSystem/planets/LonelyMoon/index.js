import React, { useMemo } from "react";
import CustomSphere from "../CustomSphere";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";
import * as THREE from "three";
import PlanetTrail from "../PlanetTrail";

const LonelyMoon = ({ position = [0, 0, 120] }) => {
   const uniforms = useMemo(
      () => ({
         uIntensity: {
            value: 1.0,
         },
         uTime: {
            value: 0.0,
         },
         uAtmosphereColor: {
            value: new THREE.Color(0.7, 0.7, 0.7),
         },
         uGradientFactor: {
            value: 0.65,
         },
         uOctaves: {
            value: 7,
         },
      }),
      []
   );

   return (
      <>
         <PlanetTrail position={position} />
         <CustomSphere
            uniforms={uniforms}
            position={position}
            orbitalSpeed={0.015}
            radius={3}
            atmosphere={{ enabled: true, scale: 1.05 }}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
         />
      </>
   );
};

export default LonelyMoon;
