import styled from "styled-components";
import { colors } from "../../styles/constants";

export const TextContainer = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 100vw;
   height: 100vh;
   pointer-events: none;
   z-index: 0;
`;

export const Title = styled.h1`
   user-select: none;
   text-align: center;
   color: white;
   z-index: 1;
   font-size: 60px;
   font-weight: bold;
   pointer-events: none;
   line-height: 40px;

   @keyframes fadeInUp {
      0% {
         transform: translateY(-200%);
         opacity: 0;
      }
      100% {
         transform: translateY(0%);
         opacity: 1;
      }
   }

   span {
      display: inline-block;
      opacity: 0;
      animation: fadeInUp 1s ease;
      animation-fill-mode: forwards;
   }
`;

export const Subtitle = styled.h2`
   user-select: none;
   text-align: center;
   z-index: 1;
   font-size: 35px;
   color: ${colors.highlight};
   font-weight: normal;
   pointer-events: none;

   @keyframes fadeInDown {
      0% {
         transform: translateY(200%);
         opacity: 0;
      }
      100% {
         transform: translateY(0%);
         opacity: 1;
      }
   }

   span {
      display: inline-block;
      opacity: 0;
      animation: fadeInDown 1s ease;
      animation-fill-mode: forwards;
   }
`;
