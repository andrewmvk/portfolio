import React, { useMemo } from "react";
import CustomSphere from "../CustomSphere";
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";
import * as THREE from "three";

const Sun = React.forwardRef(({ onClick }, ref) => {
   const uniforms = useMemo(
      () => ({
         uIntensity: {
            value: 1.0,
         },
         uTime: {
            value: 0.0,
         },
         uAtmosphereColor: {
            value: new THREE.Color(1.0, 0.42, 0.035),
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
      <CustomSphere
         ref={ref}
         uniforms={uniforms}
         orbitalSpeed={0.01}
         radius={10}
         atmosphere={{ enabled: false, scale: 1.5 }}
         fragmentShader={fragmentShader}
         vertexShader={vertexShader}
         receiveShadow={false}
         onClick={onClick}
      />
   );
});

export default Sun;
