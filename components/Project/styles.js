import styled from "styled-components";
import { colors, others } from "../../styles/constants";

export const Container = styled.div`
   @keyframes initializeProject {
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
   min-height: 80%;
   border-radius: 20px;
   animation: initializeProject ease 250ms;
   background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.01),
      rgba(255, 255, 255, 0)
   );

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
      padding: 20px 0px 20px 0px;
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
   padding: 20px 60px 40px 20px;
   animation: initializeText ease 1s;

   p {
      margin: 15px 0px 20px 0px;
      padding-right: 20px;
      max-height: 260px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
         width: 8px;
      }
      &::-webkit-scrollbar-track {
         border-radius: 10px;
         background-color: rgba(19, 20, 22, 0.5);
         &:hover {
            background-color: rgba(19, 20, 22, 1);
         }
      }
      &::-webkit-scrollbar-thumb {
         background-color: #313439;
         border-radius: 10px;
      }
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

   @media screen and (max-height: 800px) {
      p {
         max-height: 220px;
      }
   }

   @media screen and (max-height: 700px) {
      p {
         max-height: 190px;
      }
   }

   @media screen and (max-width: 1700px) {
      .logo-icon {
         transform-origin: center;
         transform: scale(0.8);
      }

      p {
         max-height: 240px;
      }

      .platforms {
         display: flex;
         gap: 15px;
      }
   }

   @media screen and (max-width: 1500px) {
      p {
         max-height: 240px;
         margin: 10px 0px 15px 0px;
      }

      .technologies {
         margin-bottom: 5px;
      }

      a > .icon {
         transform: scale(0.8);
      }
   }

   @media screen and (max-width: 1300px) {
      p {
         max-height: 200px;
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
   justify-content: center;
   align-items: center;
   z-index: 0;
   animation: initializeImages ease 1s;
`;

export const Image = styled.img`
   box-shadow: -4px -4px 5px rgba(0, 0, 0, 0.15);
   border-radius: 25px;
   position: absolute;
   transition: all 0.3s ease;
   padding: 3px;
   width: auto;
   height: calc(80% - 50px);
`;
