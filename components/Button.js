import styled from "styled-components";
import { colors } from "../styles/constants";
import React, { useState } from "react";
import { CgClose } from "react-icons/cg";

export default React.forwardRef(({ onClick, text = "TEXT" }, ref) => {
   const [clicked, setClicked] = useState(false);

   const handleClick = () => {
      if (ref && !clicked) {
         if (!ref.current.cameraSettings.showingGUI) {
            // Setted in the PlanetsScreen...
            ref.current.others.setIllusion();
            setClicked(true);
         }
      } else if (ref && clicked) {
         ref.current.others.onIllusionClose();
         setClicked(false);
      } else {
         onClick();
      }
   };

   return (
      <ButtonContainer onClick={handleClick}>
         <div>
            {clicked ? <CgClose size={28} className="icon" /> : <p>{text}</p>}
         </div>
      </ButtonContainer>
   );
});

export const ButtonContainer = styled.button`
   pointer-events: auto;
   background-color: rgba(0, 0, 0, 0);
   border: none;
   width: fit-content;
   height: fit-content;
   position: absolute;
   left: 50%;
   bottom: 5%;
   transform: translate(-50%);
   display: flex;
   justify-content: center;
   align-items: center;
   transition: all 0.3s ease;
   cursor: pointer;

   .icon {
      color: white;
   }

   p {
      text-align: center;
      font-size: 20px;
   }

   div {
      padding: 15px 25px 15px 25px;
      position: absolute;
      width: fit-content;
      height: fit-content;
      transition: all 0.1s ease;
      border: 1px solid ${colors.glassBorder};
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   &:hover {
      div {
         border-color: ${colors.highlight};
      }
   }

   &:active {
      div {
         transform-origin: center center;
         transform: scale(0.9);
      }
   }
`;
