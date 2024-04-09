import * as THREE from "three";
import React, { useRef, Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import SolarSystem from "../SolarSystem";
import { useFrame, useThree } from "@react-three/fiber";
import DynamicStars from "../DynamicStars";

export default React.forwardRef((props, ref) => {
   const cameraRef = useRef();
   const { camera } = useThree();
   const clock = new THREE.Clock();

   const calcDistance = () => {
      const position = cameraRef.current.object.position;
      const distance = Math.sqrt(
         Math.pow(position.x, 2) +
            Math.pow(position.y, 2) +
            Math.pow(position.z, 2)
      );
      return distance;
   };

   const adjustCameraPosition = (
      maxDistance = 220,
      position,
      deltaTime = 0.1
   ) => {
      const distance = calcDistance();

      if (distance < maxDistance - 20 || distance > maxDistance + 20) {
         //From cartesian to espherical coordinates (in radians)
         const r = Math.sqrt(
            position.x ** 2 + position.y ** 2 + position.z ** 2
         );
         const phi = Math.atan2(position.y, position.x);
         const theta = Math.atan2(
            Math.sqrt(position.x ** 2 + position.y ** 2),
            position.z
         );

         const newRadius = THREE.MathUtils.lerp(
            r,
            maxDistance,
            1 - 0.2 ** deltaTime
         );

         //Then from espherical to cartesian coordinates
         position.x = newRadius * Math.sin(theta) * Math.cos(phi);
         position.y = newRadius * Math.sin(theta) * Math.sin(phi);
         position.z = newRadius * Math.cos(theta);
      }
   };

   useFrame(() => {
      const delta = clock.getDelta();
      const pos = ref.current.cameraSettings.lookingAt;
      const target = cameraRef.current.target;
      for (let coord in target) {
         target[coord] = THREE.MathUtils.lerp(
            cameraRef.current.target[coord],
            pos[coord] / 1.5,
            1 - 0.3 ** delta
         );
      }

      if (pos.x === 0 && pos.y === 0 && pos.z === 0) {
         const illusionPage = ref.current.cameraSettings.illusionPage;

         const distance = calcDistance();
         if (illusionPage) {
            const maxDistance = cameraRef.current.maxDistance;
            if (distance < maxDistance - 20) {
               adjustCameraPosition(
                  cameraRef.current.maxDistance,
                  cameraRef.current.object.position,
                  delta
               );
            } else {
               cameraRef.current.minDistance = maxDistance - 20;
            }
         } else if (distance > 240) {
            adjustCameraPosition(220, cameraRef.current.object.position, delta);
         } else {
            cameraRef.current.maxDistance = 240;
         }
      }
   });

   useEffect(() => {
      camera.position.set(20, 20, 20);
      camera.far = 10000;
      camera.updateProjectionMatrix();

      // ------------------------- Setting functions to global ref ----------------------------
      // Called in "./Html", make the camera goes far (in the useFrame) and set some settings
      ref.current.others.setIllusion = () => {
         ref.current.others.setShowProject("none", false);
         ref.current.others.setModal(false);
         ref.current.others.onModalClose();
         cameraRef.current.maxDistance = 900;
         ref.current.cameraSettings.GUI.showing = true;
         ref.current.cameraSettings.GUI.name = "biography";
         ref.current.cameraSettings.illusionPage = true;
         ref.current.others.setShowBiography(true);
      };

      // Called in "./Html", reset camera settings
      ref.current.others.onIllusionClose = () => {
         cameraRef.current.minDistance = 20;
         ref.current.cameraSettings.GUI.showing = false;
         ref.current.cameraSettings.illusionPage = false;
         ref.current.others.setShowBiography(false);
      };

      // Called in "Project", reset the camera zoom setting
      ref.current.others.onProjectClose = () => {
         ref.current.cameraSettings.GUI.showing = false;
         cameraRef.current.enableZoom = true;
      };

      // Called in "Modal", reset the camera settings
      ref.current.others.onModalClose = () => {
         cameraRef.current.enableZoom = true;
         cameraRef.current.enableRotate = true;
         ref.current.cameraSettings.GUI.showing = false;
      };

      // Called in DynamicStars and in StarsList
      ref.current.others.handleStarClick = (item, index) => {
         ref.current.others.setShowBiography(false);
         ref.current.others.setShowProject("none", false);
         const GUI = ref.current.cameraSettings.GUI;
         if (
            item.position &&
            ref.current.others.setModal != null &&
            (!GUI.showing || GUI.name == "modal")
         ) {
            ref.current.cameraSettings.GUI.showing = true;
            ref.current.cameraSettings.GUI.name = "modal";
            ref.current.tools.selected = index;
            ref.current.cameraSettings.lookingAt = item.position;

            cameraRef.current.enableZoom = false;
            cameraRef.current.enableRotate = false;
            // Function setted in "Modal"
            ref.current.others.setModal();
         }
      };
   }, []);

   // Function setted here and called by the planet when it is clicked
   const handlePlanetClick = (project = "none", planet) => {
      if (!ref.current.cameraSettings.GUI.showing) {
         ref.current.cameraSettings.GUI.showing = true;
         ref.current.cameraSettings.GUI.name = "project";
         // First show the project related to the planet (setted in "Solar System")
         ref.current.others.setShowProject(project);
         // Disable zoom for a better experience
         cameraRef.current.enableZoom = false;

         // Set the position of the planet using it's reference so the camera can follow it
         ref.current.cameraSettings.lookingAt = planet.current.position;
      }
   };

   return (
      <>
         <OrbitControls
            ref={cameraRef}
            enableRotate
            enableZoom
            enablePan={false}
            enabled
            maxDistance={220}
            minDistance={20}
         />
         <Suspense fallback={null}>
            <SolarSystem handlePlanetClick={handlePlanetClick} ref={ref} />
         </Suspense>
         <DynamicStars radius={500} ref={ref} />
      </>
   );
});
