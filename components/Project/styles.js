import styled from "styled-components";
import { colors, others } from "../../styles/constants";

export const Container = styled.div`
   @keyframes initialize {
      from {
         opacity: 0;
         transform: translate(-50%, 25%);
      }
      to {
         opacity: 1;
         transform: translate(-50%, -50%);
      }
   }

   pointer-events: auto;
   position: absolute;
   display: grid;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   grid-template-columns: repeat(2, 1fr);
   width: 50vw;
   height: 75vh;
   background: ${colors.glassBg};
   border-radius: 20px;
   backdrop-filter: blur(${others.blur}px);
   -webkit-backdrop-filter: blur(${others.blur}px);
   border: 1px solid ${colors.glassBorder};
   animation: initialize ease 250ms;

   .icon {
      color: white;
   }

   .icon.corner {
      position: absolute;
      right: 25px;
   }

   .icon.close {
      top: 25px;
      cursor: pointer;
      z-index: 3;
   }

   .scroll-indicator {
      position: absolute;
      right: 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      p {
         font-weight: 200;
      }

      @keyframes up-down-animation {
         0% {
            transform: translateY(0%);
         }
         50% {
            transform: translateY(-25%);
         }
         100% {
            transform: translateY(0%);
         }
      }

      bottom: 25px;
      animation: up-down-animation 2s ease-in-out infinite;
   }

   .no-project {
      grid-column-start: 1;
      grid-column-end: 3;
      display: flex;
      justify-content: center;
      align-items: center;
   }
`;

export const TitleContainer = styled.div`
   grid-column-start: 1;
   grid-column-end: 3;
   grid-row-start: 1;
   grid-row-end: 2;
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   z-index: 1;

   h1 {
      padding: 10px 0px 20px 0px;
   }

   div {
      width: 70%;
      height: 1px;
      background-color: ${colors.glassBorder};
      margin-bottom: 20px;
   }
`;

export const TextContainer = styled.div`
   @keyframes initializeText {
      from {
         opacity: 0;
         transform: translateX(50%);
      }
      to {
         opacity: 1;
         transform: translateX(0%);
      }
   }

   grid-column-start: 2;
   grid-column-end: 3;
   grid-row-start: 2;
   grid-row-end: 10;
   padding: 20px 60px 20px 20px;
   animation: initializeText ease 1s;

   p {
      margin: 15px 0px 20px 0px;
   }

   .icon {
      border-radius: 10px;
      border: 2px solid white;
      padding: 2px;
   }

   .platform-div {
      display: flex;
      align-items: center;
      cursor: pointer;
      width: fit-content;
      margin-top: 10px;

      a {
         display: flex;
         align-items: center;
         h3 {
            margin-left: 10px;
            text-decoration: underline;
         }
      }
   }

   .technologies {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;

      * {
         cursor: pointer;
      }
   }
`;

export const ImageContainer = styled.div`
   @keyframes initializeImages {
      from {
         opacity: 0;
         transform: translateX(-50%);
      }
      to {
         opacity: 1;
         transform: translateX(0%);
      }
   }

   grid-column-start: 1;
   grid-column-end: 2;
   grid-row-start: 2;
   grid-row-end: 10;
   display: flex;
   flex-direction: row;
   justify-content: right;
   padding: 8% 4%;
   z-index: 0;
   animation: initializeImages ease 1s;
`;

export const Image = styled.img`
   width: 13vw;
   box-shadow: -4px -4px 5px rgba(0, 0, 0, 0.15);
   border-radius: 25px;
   position: absolute;
   transition: all 0.3s ease;
   padding: 3px;
`;
