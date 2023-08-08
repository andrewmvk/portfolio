import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StarsBackground from "../StarsBackground";
import { Subtitle, TextContainer, Title } from "./styles";
import Button from "../Button";

export const StarsScreenHtml = React.forwardRef(({ handleTransition }, ref) => {
   const [texts, setTexts] = useState({
      title: [],
      subtitle: [],
      button: "",
   });

   const handleLangChange = () => {
      const locale = ref.current.locales.data[ref.current.locales.selected];
      const title = locale.starsScreen.title.trim().split(" ");
      const subtitle = locale.starsScreen.subtitle.trim().split(" ");
      const button = locale.starsScreen.button;
      setTexts({ title, subtitle, button });
   };

   useEffect(() => {
      handleLangChange();
      ref.current.locales.remount = handleLangChange;
   }, []);

   const Paragraph = ({ text, delay = 0 }) => {
      return text.map((word, index) => {
         return (
            <span
               key={index}
               style={{
                  animationDelay: `${index * 0.15 + delay * 0.15}s`,
                  marginLeft: index != 0 ? 20 : 0,
               }}
            >
               {word}
            </span>
         );
      });
   };

   const handleClick = e => {
      const acceleration = ref.current.stars.acceleration;
      if (e.target.checked) {
         if (acceleration < 0) {
            ref.current.stars.acceleration = -acceleration;
         }
         if (!ref.current.stars.running) {
            handleTransition(0);
         }
      } else {
         ref.current.stars.acceleration = -acceleration;
      }
   };

   return (
      <>
         <TextContainer>
            <Title>
               <Paragraph text={texts.title} delay={0} />
            </Title>
            <Subtitle>
               <Paragraph text={texts.subtitle} delay={texts.title.length} />
            </Subtitle>
         </TextContainer>
         <Button text={texts.button} onClick={handleClick} />
      </>
   );
});

const StarsScreen = React.forwardRef((props, ref) => {
   const posRef = useRef();
   const mouseRef = useRef({ x: 0, y: 0 });

   useFrame(() => {
      if (posRef.current) {
         //smothing the mouse position change event
         const valueX = THREE.MathUtils.lerp(
            mouseRef.current.x,
            ref.current.mouseTrack.x,
            0.1
         );
         const valueY = THREE.MathUtils.lerp(
            mouseRef.current.y,
            ref.current.mouseTrack.y,
            0.1
         );

         mouseRef.current = { x: valueX, y: valueY };

         //mouseX and mouseY are mapped: -1 to 1 (-1 is extreme left, 1 is extreme right)
         const mouseX = (valueX / window.innerWidth) * 2 - 1;
         const mouseY = (valueY / window.innerHeight) * 2 - 1;

         //changing the rotation of the stars
         posRef.current.rotation.y = (mouseX * Math.PI) / 8;
         posRef.current.rotation.x = (mouseY * Math.PI) / 12;
      }
   });

   return (
      <group ref={posRef} position={[0, 0, 0]}>
         <StarsBackground ref={ref} />
      </group>
   );
});

export default StarsScreen;
