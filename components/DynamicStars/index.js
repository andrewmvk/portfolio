import { StarCircle, StarTitle } from "./styles";
import { colors, letters } from "../../styles/constants";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Html, Point, PointMaterial, Points } from "@react-three/drei";
import * as THREE from "three";
import StaticStars from "../StaticStars";

const Word = React.forwardRef(
   ({ children, revealedWord, position, index, distanceFactor }, ref) => {
      const [wordData, setWordData] = useState({
         word: children,
         revealed: false,
      });
      const circleRef = useRef();
      const titleRef = useRef();
      const sSize = 8;

      const over = e => {
         e.stopPropagation();
         document.body.style.cursor = "pointer";
         titleRef.current.style.color = colors.highlight;
         circleRef.current.style.transform = "scale(2)";
         if (!wordData.revealed) handleHover();
      };

      const out = () => {
         document.body.style.cursor = "default";
         titleRef.current.style.color = "white";
         circleRef.current.style.transform = "scale(1)";
      };

      const handleHover = useCallback(() => {
         let iterations = 0;
         const interval = setInterval(() => {
            let newWord = "";
            for (let j = 0; j < revealedWord.length; j++) {
               if (j < iterations) {
                  newWord += revealedWord[j];
               } else {
                  newWord +=
                     letters[Math.floor(Math.random() * letters.length)];
               }
            }

            setWordData({ word: newWord, revealed: true });
            if (iterations >= revealedWord.length) {
               clearInterval(interval);
            }

            iterations++;
         }, 50);
      }, []);

      return (
         <group position={position}>
            <Point size={sSize} />
            <Html distanceFactor={distanceFactor} occlude zIndexRange={[0, 0]}>
               <StarCircle ref={circleRef} sSize={sSize} />
               <StarTitle
                  ref={titleRef}
                  onClick={() =>
                     ref.current.others.handleStarClick(
                        { name: wordData.word, position },
                        index
                     )
                  }
                  onPointerOver={over}
                  onPointerOut={out}
               >
                  {wordData.word}
               </StarTitle>
            </Html>
         </group>
      );
   }
);

export default React.forwardRef(({ radius = 300 }, ref) => {
   // --------- Dynamic stars Configuration --------------

   const words = useMemo(() => {
      const temp = [];
      const spherical = new THREE.Spherical();
      const thetaSpan = Math.PI * 2;
      const phiSpan = Math.PI;

      const technologies =
         ref.current.locales.data[ref.current.locales.selected].technologies;
      for (let i = 0; i < technologies.length; i++) {
         let word = "";
         //I know, it's a large name...
         for (let j = 0; j < technologies[i].name.length; j++) {
            word += letters[Math.floor(Math.random() * letters.length)];
         }

         const phi = phiSpan * Math.random();
         const theta = thetaSpan * Math.random();

         const wordPos = new THREE.Vector3().setFromSpherical(
            spherical.set(radius, phi, theta)
         );
         //Save its position, so the StarsList can access it
         technologies[i].position = wordPos;

         const originalWord = technologies[i].name;
         //This is a array that contains the word position, the 'cryptographic format' of the word and the word itself
         temp.push([wordPos, word, originalWord]);
      }
      return temp;
   }, [radius]);

   // ----------------------------------------------------

   // --------------- Static stars random positions, colors and sizes ------------

   const stars = useMemo(() => {
      let positions = [];
      let colors = [];
      let sizes = [];
      for (let i = 0; i < 5000; i++) {
         const theta = Math.random() * 2 * Math.PI;
         const phi = Math.acos(2 * Math.random() - 1);

         const x = Math.cos(theta) * Math.sin(phi);
         const y = Math.sin(theta) * Math.sin(phi);
         const z = Math.cos(phi);

         const size = Math.random() + 0.2;
         const colorShift = (1 + Math.random()) * 0.5;

         sizes.push(size * 2);
         colors.push(size * colorShift, size * colorShift, size * colorShift);
         positions.push(x * radius, y * radius, z * radius);
      }

      return {
         positions: new Float32Array(positions),
         colors: new Float32Array(colors),
         sizes: new Float32Array(sizes),
      };
   }, []);

   //----------------------------------------------------------------

   return (
      <group>
         <Points>
            <PointMaterial vertexColors sizeAttenuation />
            {words.map(([pos, word, revealedWord], index) => (
               <Word
                  key={index}
                  index={index}
                  revealedWord={revealedWord}
                  position={pos}
                  children={word}
                  distanceFactor={radius / 25}
                  ref={ref}
               />
            ))}
         </Points>
         <StaticStars stars={stars} />
      </group>
   );
});
