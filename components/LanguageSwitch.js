import React from "react";
import styled from "styled-components";
import { colors } from "../styles/constants";

export default React.forwardRef((props, ref) => {
   const handleChange = e => {
      const checked = e.target.checked;
      if (checked) {
         ref.current.locales.selected = "enUS";
      } else {
         ref.current.locales.selected = "ptBR";
      }
      ref.current.locales.remount();
   };

   return (
      <Container>
         <input type="checkbox" onChange={handleChange} />
         <div />
      </Container>
   );
});

const Container = styled.label`
   pointer-events: auto;
   position: absolute;
   top: 2%;
   right: 1%;
   cursor: pointer;
   width: 140px;
   height: 40px;
   border: 1px solid ${colors.glassBorder};
   border-radius: 20px;
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 2;

   input {
      pointer-events: auto;
      cursor: pointer;
      appearance: none;
      display: flex;
      justify-content: space-between;
      height: 100%;
      width: 100%;
      font-size: 13px;
      z-index: 1;

      &::before,
      &::after {
         display: flex;
         align-items: center;
         justify-content: center;
         width: 40%;
         height: 100%;
         border-radius: 12px;
         transition: color 0.6s ease;
      }

      &::before {
         content: "PT/BR";
         color: black;
      }

      &::after {
         content: "EN/US";
         color: ${colors.text};
      }

      &:checked {
         &::before {
            color: ${colors.text};
         }
         &::after {
            color: black;
         }
      }
   }

   div {
      z-index: 0;
      position: absolute;
      left: 5px;
      border-radius: 20px;
      background-color: ${colors.highlight};
      width: 65px;
      height: 30px;
      transition: all 0.3s ease;
   }

   input:checked ~ div {
      left: 70px;
   }
`;
