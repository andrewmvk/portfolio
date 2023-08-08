import styled from "styled-components";
import { colors } from "../styles/constants";
import React from "react";

export default ({ onClick, text = "TEXT" }) => {
   return (
      <ButtonContainer>
         <input id="bottom-button" type="checkbox" onChange={onClick} />
         <label htmlFor="bottom-button" className="bottom-button-label">
            <div className="bar" />
            <div className="bar" />
            <p>{text}</p>
         </label>
      </ButtonContainer>
   );
};

const ButtonContainer = styled.button`
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

   @keyframes animate-bar2 {
      0% {
         transform: translate(100%, -100%);
      }
      33% {
         transform: translate(0%, -100%);
      }
      66% {
         transform: translate(0%, 0%);
      }
      100% {
         transform: rotateZ(-45deg);
      }
   }

   @keyframes animate-bar1 {
      0% {
         transform: translate(-100%, 100%);
      }
      33% {
         transform: translate(0%, 100%);
      }
      66% {
         transform: translate(0%, 0%);
      }
      100% {
         transform: rotateZ(45deg);
      }
   }

   #bottom-button {
      appearance: none;

      &:hover + label {
         border-color: ${colors.highlight};
      }
   }

   #bottom-button:checked + label {
      p {
         opacity: 0;
      }
      .bar {
         opacity: 1;
         &:nth-child(1) {
            animation: animate-bar1 0.5s ease;
            animation-fill-mode: forwards;
         }
         &:nth-child(2) {
            animation: animate-bar2 0.5s ease;
            animation-fill-mode: forwards;
         }
      }
   }

   @keyframes animate-bar2-reverse {
      0% {
         transform: rotateZ(-45deg);
      }
      33% {
         transform: translate(0%, 0%) rotateZ(0deg);
      }
      66% {
         transform: translate(0%, -100%);
      }
      100% {
         transform: translate(100%, -100%);
      }
   }

   @keyframes animate-bar1-reverse {
      0% {
         transform: rotateZ(45deg);
      }
      33% {
         transform: translate(0%, 0%);
      }
      66% {
         transform: translate(0%, 100%);
      }
      100% {
         transform: translate(-100%, 100%);
      }
   }

   #bottom-button:not(:checked) + label {
      p {
         opacity: 1;
         transition-delay: 0.5s;
      }
      .bar {
         opacity: 0;
         &:nth-child(1) {
            animation: animate-bar1-reverse 0.5s ease;
            animation-fill-mode: forwards;
         }
         &:nth-child(2) {
            animation: animate-bar2-reverse 0.5s ease;
            animation-fill-mode: forwards;
         }
      }
   }

   .bottom-button-label {
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
      cursor: pointer;

      .bar {
         position: absolute;
         background-color: white;
         width: 30px;
         height: 3px;
         border-radius: 5px;
         transition: 0.5s linear;
         opacity: 0;
      }
   }

   p {
      text-align: center;
      font-size: 20px;
      transition: 0.5s linear;
   }

   &:active {
      label {
         transform-origin: center;
         transform: scale(0.9);
      }
   }
`;
