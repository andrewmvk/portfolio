import React, { useMemo } from "react";
import CustomSphere from "../CustomSphere";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";
import * as THREE from "three";
import PlanetTrail from "../PlanetTrail";

const WhiteHole = ({ position = [0, 0, -180] }) => {
   const uniforms = useMemo(
      () => ({
         uIntensity: {
            value: 1.0,
         },
         uTime: {
            value: 0.0,
         },
         uAtmosphereColor: {
            value: new THREE.Color(1.0, 1.0, 1.0),
         },
         uGradientFactor: {
            value: 0.25,
         },
         uOctaves: {
            value: 0,
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
            atmosphere={{ enabled: true, scale: 1.2 }}
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
         />
      </>
   );
};

export default WhiteHole;
