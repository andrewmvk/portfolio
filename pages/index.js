import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Canvas, useFrame } from "@react-three/fiber";
import { toolsData } from "../styles/constants";
import WaterMark from "../components/WaterMark";
import StarsScreen, { StarsScreenHtml } from "./StarsScreen";
import PlanetScreen from "./PlanetsScreen";
import PlanetsScreenHtml from "./PlanetsScreen/Html";
import {
   EffectComposer,
   GodRays,
   HueSaturation,
   Vignette,
} from "@react-three/postprocessing";
import LanguageSwitch from "../components/LanguageSwitch";
import locales from "../public/locales";
import { BsHandIndex } from "react-icons/bs";

const TransitionScreen = React.forwardRef((props, ref) => {
   const transitionRef = useRef();

   const startTransition = (isGoing = true) => {
      if (transitionRef.current) {
         let value = 0;
         const interval = setInterval(() => {
            value += 2;
            if (isGoing) {
               transitionRef.current.style.background =
                  "radial-gradient(circle, rgba(250, 250, 250, 1)" +
                  value +
                  "%, rgba(250, 250, 250, 0)" +
                  value * 1.2 +
                  "%)";
            } else {
               transitionRef.current.style.background =
                  "radial-gradient(circle, rgba(250, 250, 250, 0)" +
                  value +
                  "%, rgba(250, 250, 250, 1)" +
                  value * 1.2 +
                  "%)";
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

const ScreensHtml = React.forwardRef((props, ref) => {
   const [screenHtml, setScreenHtml] = useState(-1);

   const handleTransition = (index, stop = false) => {
      //This function will do nothing if the user is already on the page
      if (screenHtml == -1) {
         const maxVelocity = ref.current.stars.maxVelocity;
         let newVelocity = ref.current.stars.currentVelocity;
         if (!stop) {
            //A interval setted to make a acceleration effect to the stars movement
            const interval = setInterval(() => {
               newVelocity += ref.current.stars.acceleration;
               ref.current.stars.currentVelocity = newVelocity;
               if (newVelocity >= maxVelocity) {
                  //When reach the max speed, it will start the transition and change the screen
                  ref.current.transition.start(true);
                  setTimeout(() => {
                     ref.current.screen.changeScreen(index);
                     setScreenHtml(0);
                     ref.current.transition.start(false);
                  }, 1000);
                  clearInterval(interval);
               }
            }, 10);
         } else {
            //When the user wants to stop the transition
         }
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

const Screens = React.forwardRef((props, ref) => {
   const [screen, setScreen] = useState(-1);

   const changeScreen = (index = 0) => {
      setScreen(index);
   };

   useEffect(() => {
      ref.current.screen.changeScreen = changeScreen;
   }, []);

   return (
      <>
         {screen == 0 ? <PlanetScreen ref={ref} /> : null}
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
         lookingAt: null,
         illusionPage: false,
         showingGUI: false,
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
            <Screens ref={globalRefs} />
            <Effects ref={globalRefs} />
         </Canvas>
         <ScreensHtml ref={globalRefs} />
         <WaterMark />
         <LanguageSwitch ref={globalRefs} />
         <BsHandIndex className="hand-icon" size={32} />
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

   .hand-icon {
      color: white;
      position: absolute;
      right: 5%;
      bottom: 10%;
      transform-origin: right bottom;
      animation: movement 2s ease infinite;

      @keyframes movement {
         0% {
            transform: translate(-25%, 0%) rotateZ(-80deg);
         }
         50% {
            transform: translate(25%, -10%) rotateZ(-10deg);
         }
         100% {
            transform: translate(-25%, 0%) rotateZ(-80deg);
         }
      }
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
