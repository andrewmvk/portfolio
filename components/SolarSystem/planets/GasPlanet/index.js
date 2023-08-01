import React, { useMemo } from "react";
import CustomSphere from "../CustomSphere";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";
import * as THREE from "three";
import PlanetTrail from "../PlanetTrail";

const GasPlanet = ({ position = [0, 0, -180], onClick }) => {
   const uniforms = useMemo(
      () => ({
         uIntensity: {
            value: 1.0,
         },
         uTime: {
            value: 0.0,
         },
         uAtmosphereColor: {
            value: new THREE.Color(0.94, 0.43, 0.22),
         },
         uGradientFactor: {
            value: 0.25,
         },
         uOctaves: {
            value: 8,
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
            orbitalSpeed={0.005}
            radius={4}
            atmosphere={{ enabled: true, scale: 1.1 }}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
            onClick={onClick}
         />
      </>
   );
};

export default GasPlanet;
