import styled from "styled-components";
import { colors, others } from "../../styles/constants";

export const Container = styled.div`
   pointer-events: auto;
   position: absolute;
   display: flex;
   flex-direction: column;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 50vw;
   height: 52vh;
   border-radius: 20px;
   padding: 35px;
   background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.01),
      rgba(255, 255, 255, 0)
   );

   @media screen and (max-width: 1700px) {
      padding: 30px;
      width: 53vw;
      height: 57vh;
   }

   @media screen and (max-width: 1200px) {
      width: 60vw;
      height: 64vh;
   }

   @media screen and (max-width: 650px) {
      width: 70vw;
      height: 80vh;
   }
`;

export const Line = styled.div`
   width: 45%;
   height: 2px;
   background-color: ${colors.highlight};
`;

export const TextContainer = styled.div`
   display: flex;
   flex: 4.5;
   padding: 15px 25px 15px 25px;
   overflow-y: scroll;

   &::-webkit-scrollbar {
      width: 0px;
   }
`;

export const LevelCountContainer = styled.div`
   display: flex;
   min-height: 100%;
   width: 20%;
   justify-content: right;
`;

export const LevelCountPart = styled.div`
   width: 23px;
   height: 23px;
   border-radius: 20px;
   border: 1px solid rgba(255, 255, 255, 0.5);
   padding: 2px;

   @media screen and (max-width: 1700px) {
      width: 20px;
      height: 20px;
   }

   .fill {
      width: 100%;
      height: 100%;
      background-color: ${colors.highlight};
      border-radius: 20px;
   }

   :nth-child(1),
   :nth-child(1) > .level {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
   }

   :nth-child(2),
   :nth-child(3) {
      border-radius: 0px;
      .level {
         border-radius: 0px;
      }
   }

   :nth-child(4),
   :nth-child(4) > .level {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
   }
`;

export const ButtonContainer = styled.div`
   display: flex;
   flex: 1.5;
   width: 100%;
   min-height: max-content;
   justify-content: end;
   align-items: end;
`;
