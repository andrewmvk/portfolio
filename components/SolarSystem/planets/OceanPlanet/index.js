import React, { useMemo } from "react";
import CustomSphere from "../CustomSphere";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";
import * as THREE from "three";
import PlanetTrail from "../PlanetTrail";

const OceanPlanet = ({ position = [0, 0, 40], onClick }) => {
   const uniforms = useMemo(
      () => ({
         uIntensity: {
            value: 1.0,
         },
         uTime: {
            value: 0.0,
         },
         uAtmosphereColor: {
            value: new THREE.Color(0.427, 0.602, 0.463),
         },
         uGradientFactor: {
            value: 0.65,
         },
         uOctaves: {
            value: 5,
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
            orbitalSpeed={0.02}
            radius={4}
            atmosphere={{ enabled: true, scale: 1.15 }}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            ringEnabled
            onClick={onClick}
         />
      </>
   );
};

export default OceanPlanet;
