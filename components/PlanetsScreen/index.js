import * as THREE from "three";
import React, { useRef, Suspense, useEffect } from "react";
import { OrbitControls } from "@react-three/drei";
import SolarSystem from "../SolarSystem";
import { useFrame, useThree } from "@react-three/fiber";
import DynamicStars from "../DynamicStars";

export default React.forwardRef((props, ref) => {
   const cameraRef = useRef();
   const { camera } = useThree();

   const calcDistance = () => {
      const position = cameraRef.current.object.position;
      const distance = Math.sqrt(
         Math.pow(position.x, 2) +
            Math.pow(position.y, 2) +
            Math.pow(position.z, 2)
      );
      return distance;
   };

   const adjustCameraPosition = (maxDistance = 220, position) => {
      const distance = calcDistance();

      if (distance < maxDistance - 20 || distance > maxDistance + 20) {
         for (let coord in position) {
            position[coord] = THREE.MathUtils.lerp(
               position[coord],
               maxDistance / Math.sqrt(3),
               0.01
            );
         }
      }
   };

   useFrame(() => {
      const lookingAtPosition = ref.current.cameraSettings.lookingAt;
      if (lookingAtPosition) {
         const target = cameraRef.current.target;
         for (let coord in target) {
            target[coord] = THREE.MathUtils.lerp(
               cameraRef.current.target[coord],
               lookingAtPosition[coord] / 1.5,
               0.02
            );
         }
      }

      const illusionPage = ref.current.cameraSettings.illusionPage;

      const distance = calcDistance();
      if (illusionPage) {
         const maxDistance = cameraRef.current.maxDistance;
         if (distance < maxDistance - 20) {
            adjustCameraPosition(
               cameraRef.current.maxDistance,
               cameraRef.current.object.position
            );
         } else {
            cameraRef.current.minDistance = maxDistance - 20;
         }
      } else if (distance > 240) {
         adjustCameraPosition(220, cameraRef.current.object.position);
      } else {
         cameraRef.current.maxDistance = 240;
      }
   });

   useEffect(() => {
      camera.position.set(20, 20, 20);
      camera.far = 10000;
      camera.updateProjectionMatrix();

      // ------------------------- Setting functions to global ref ----------------------------
      // Called in "./Html", make the camera goes far (in the useFrame) and set some settings
      ref.current.others.setIllusion = () => {
         cameraRef.current.maxDistance = 900;
         ref.current.cameraSettings.showingGUI = true;
         ref.current.cameraSettings.illusionPage = true;
         ref.current.others.setShowBiography(true);
      };

      // Called in "./Html", reset camera settings
      ref.current.others.onIllusionClose = () => {
         cameraRef.current.minDistance = 20;
         ref.current.cameraSettings.showingGUI = false;
         ref.current.cameraSettings.illusionPage = false;
         ref.current.others.setShowBiography(false);
      };

      // Called in "Project", reset the camera zoom setting
      ref.current.others.onProjectClose = () => {
         ref.current.cameraSettings.showingGUI = false;
         cameraRef.current.enableZoom = true;
      };

      // Called in "Modal", reset the camera settings
      ref.current.others.onModalClose = () => {
         cameraRef.current.maxDistance = 220;
         cameraRef.current.enableZoom = true;
         cameraRef.current.enableRotate = true;
         ref.current.cameraSettings.showingGUI = false;
      };
   }, []);

   // Function setted here and called by the planet when it is clicked
   const handlePlanetClick = (project = "none", planet) => {
      if (!ref.current.cameraSettings.showingGUI) {
         ref.current.cameraSettings.showingGUI = true;
         // First show the project related to the planet (setted in "Solar System")
         ref.current.others.setShowProject(project);
         // Disable zoom for a better experience
         cameraRef.current.enableZoom = false;

         // Set the position of the planet using it's reference so the camera can follow it
         ref.current.cameraSettings.lookingAt = planet.current.position;
      }
   };

   const handleStarClick = (item, index) => {
      const showingGUI = ref.current.cameraSettings.showingGUI;
      if (item.position && ref.current.others.setModal != null && !showingGUI) {
         ref.current.cameraSettings.showingGUI = true;
         ref.current.tools.selected = index;
         ref.current.cameraSettings.lookingAt = item.position;

         cameraRef.current.enableZoom = false;
         cameraRef.current.enableRotate = false;
         cameraRef.current.maxDistance = 1000;
         // Function setted in "Modal"
         ref.current.others.setModal();
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
         <DynamicStars
            handleItemClick={handleStarClick}
            radius={500}
            ref={ref}
         />
      </>
   );
});
