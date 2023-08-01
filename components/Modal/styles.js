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
   background: ${colors.glassBg};
   width: 50%;
   height: 50%;
   border-radius: 20px;
   backdrop-filter: blur(${others.blur}px);
   -webkit-backdrop-filter: blur(${others.blur}px);
   border: 1px solid ${colors.glassBorder};
   box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
   padding: 40px;

   @media screen and (max-width: 650px) {
      width: 70%;
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
   padding: 1.5% 3% 1.5% 3%;
   overflow-y: auto;

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
   width: 20px;
   height: 20px;
   border-radius: 20px;
   border: 1px solid rgba(255, 255, 255, 0.5);
`;

export const ButtonContainer = styled.div`
   display: flex;
   flex: 1.5;
   width: 100%;
   min-height: max-content;
   justify-content: end;
`;
