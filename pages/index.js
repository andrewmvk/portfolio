import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { toolsData } from "../styles/constants";
import WaterMark from "../components/WaterMark";
import {
   EffectComposer,
   GodRays,
   HueSaturation,
   Vignette,
} from "@react-three/postprocessing";
import LanguageSwitch from "../components/LanguageSwitch";
import locales from "../public/locales";
import PlanetsScreen from "../components/PlanetsScreen";
import PlanetsScreenHtml from "../components/PlanetsScreen/Html";
import StarsScreen, { StarsScreenHtml } from "../components/StarsScreen";

const TransitionScreen = React.forwardRef((props, ref) => {
   const transitionRef = useRef();

   const startTransition = (isGoing = true) => {
      if (transitionRef.current) {
         let value = 0;
         const interval = setInterval(() => {
            value += 1;
            const g = value * 0.05 + 9;
            if (isGoing) {
               transitionRef.current.style.background = `radial-gradient(circle, rgba(${g}, ${g}, ${g}, 1) ${value}%, rgba(9, 9, 9, 0) ${
                  value * 1.2
               }%)`;
            } else {
               transitionRef.current.style.background = `radial-gradient(circle, rgba(${g}, ${g}, ${g}, 0) ${value}%, rgba(9, 9, 9, 1) ${
                  value * 1.2
               }%)`;
            }

            if (value >= 100) {
               clearInterval(interval);
            }
         }, 5);
      }
   };

   useEffect(() => {
      ref.current.transition.start = startTransition;
   }, []);

   return <TransitionBackground ref={transitionRef} />;
});

const ScreensHtml = React.forwardRef(({ initial = -1 }, ref) => {
   const [screenHtml, setScreenHtml] = useState(initial);

   const handleTransition = index => {
      //This function will do nothing if the user is already on the page
      if (screenHtml == -1) {
         const maxVelocity = ref.current.stars.maxVelocity;
         const minVelocity = ref.current.stars.initialVelocity;
         let newVelocity = ref.current.stars.currentVelocity;
         //A interval setted to make a acceleration effect to the stars movement

         ref.current.stars.running = true;
         const interval = setInterval(() => {
            newVelocity += ref.current.stars.acceleration;
            ref.current.stars.currentVelocity = newVelocity;
            if (newVelocity >= maxVelocity) {
               //When reach the max speed, it will start the transition and change the screen
               ref.current.transition.start(true);
               setTimeout(() => {
                  ref.current.screen.changeScreen(index);
                  setScreenHtml(index);
                  ref.current.transition.start(false);
               }, 1000);
               clearInterval(interval);
               ref.current.stars.running = false;
            } else if (newVelocity <= minVelocity) {
               clearInterval(interval);
               ref.current.stars.running = false;
            }
         }, 10);
      }
   };

   return (
      <>
         {screenHtml == -1 ? (
            <StarsScreenHtml handleTransition={handleTransition} ref={ref} />
         ) : (
            <PlanetsScreenHtml ref={ref} />
         )}
         <TransitionScreen ref={ref} />
      </>
   );
});

const Screens = React.forwardRef(({ initial = -1 }, ref) => {
   const [screen, setScreen] = useState(initial);

   const changeScreen = (index = 0) => {
      setScreen(index);
   };

   useEffect(() => {
      ref.current.screen.changeScreen = changeScreen;
   }, []);

   return (
      <>
         {screen == 0 ? <PlanetsScreen ref={ref} /> : null}
         {screen == -1 ? <StarsScreen ref={ref} /> : null}
      </>
   );
});

const Effects = React.forwardRef((props, ref) => {
   const [sunDefined, setSunDefined] = useState(false);
   const [density, setDensity] = useState(1);
   const densityProps = { max: 3, min: 1 };

   useFrame(() => {
      const illusionPage = ref.current.cameraSettings.illusionPage;
      if (illusionPage && density !== densityProps.max) {
         setDensity(densityProps.max);
      } else if (!illusionPage && density !== densityProps.min) {
         setDensity(densityProps.min);
      }

      const sunRef = ref.current.stars.sun;
      if (sunRef && !sunDefined) {
         setSunDefined(true);
      }
   });

   return (
      <EffectComposer>
         <Vignette eskil offset={0.5} darkness={1.1} />
         <HueSaturation saturation={0.35} />
         {sunDefined ? (
            <GodRays
               sun={ref.current.stars.sun}
               density={density}
               decay={0.75}
               weight={0.3}
               exposure={0.35}
            />
         ) : null}
      </EffectComposer>
   );
});

export default function Home() {
   const functionNotSetted = () => {
      console.log("Error setting the function to the global reference");
   };

   //This is the reference for each of the screens components, they use their own ref and the mouseTrack
   const globalRefs = useRef({
      //Mouse position relative to the Canva component
      mouseTrack: {
         x: 0,
         y: 0,
      },
      cameraSettings: {
         illusionPage: false,
         lookingAt: new THREE.Vector3(0, 0, 0),
         GUI: { showing: false, name: "" },
      },
      //TransitionScreen reference, the value is used to increase(>0), decrease(<0) or do nothing (=0)
      transition: {
         value: 2,
         start: functionNotSetted,
         isTransitioning: false,
      },
      //This is the first screen reference, used to change the stars velocity with a certain acceleration
      stars: {
         sun: null,
         initialVelocity: 1,
         currentVelocity: 1,
         maxVelocity: 25,
         acceleration: 0.05,
         running: false,
      },
      tools: {
         //The selected value is the current selected star, it can goes from 0 to the toolsData length (index)
         selected: null,
         data: toolsData,
      },
      screen: {
         changeScreen: functionNotSetted,
         changeScreenHtml: functionNotSetted,
      },
      others: {
         setModal: functionNotSetted,
         onModalClose: functionNotSetted,
         setShowProject: functionNotSetted,
         onProjectClose: functionNotSetted,
         setIllusion: functionNotSetted,
         onIllusionClose: functionNotSetted,
         setShowBiography: functionNotSetted,
         handleStarClick: functionNotSetted,
      },
      locales: {
         data: locales,
         selected: "ptBR",
         remount: functionNotSetted,
      },
   });

   const handleMouseMove = event => {
      globalRefs.current.mouseTrack = { x: event.clientX, y: event.clientY };
   };

   return (
      <Container>
         <Canvas
            id="canvas"
            onMouseMove={handleMouseMove}
            resize={{ scroll: false }}
            camera={{ position: [0, 0, 0], fov: 75, far: 1500 }}
         >
            <Screens ref={globalRefs} initial={-1} />
            <Effects ref={globalRefs} />
         </Canvas>
         <ScreensHtml ref={globalRefs} initial={-1} />
         <WaterMark />
         <LanguageSwitch ref={globalRefs} />
      </Container>
   );
}

const Container = styled.div`
   position: fixed;
   top: 0;
   left: 0;
   height: 100vh;
   width: 100vw;
   padding: 0;
   margin: 0;

   #canvas {
      background: rgb(9, 9, 9);
   }
`;

const TransitionBackground = styled.div`
   position: absolute;
   pointer-events: none;
   top: 0;
   left: 0;
   z-index: 1000;
   width: 100vw;
   height: 100vh;
`;
