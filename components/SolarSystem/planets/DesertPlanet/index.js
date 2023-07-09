import React, { useMemo } from "react";
import CustomSphere from "../CustomSphere";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";
import * as THREE from "three";
import PlanetTrail from "../PlanetTrail";

const DesertPlanet = ({ position = [0, 0, -30] }) => {
   const uniforms = useMemo(
      () => ({
         uIntensity: {
            value: 1.0,
         },
         uTime: {
            value: 0.0,
         },
         uAtmosphereColor: {
            value: new THREE.Color(0.659, 0.4, 0.196),
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
            orbitalSpeed={0.05}
            radius={2}
            atmosphere={{ enabled: true, scale: 1.15 }}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
         />
      </>
   );
};

export default DesertPlanet;
