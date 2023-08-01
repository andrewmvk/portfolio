import styled from "styled-components";
import { colors, others } from "../../styles/constants";

export const ImageContainer = styled.div`
   width: 150px;
   height: 150px;
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 50%;
   margin-right: 50px;
   float: left;
   border: 2px solid ${colors.glassBorder};
`;

export const BigContainer = styled.div`
   display: flex;
   justify-content: space-between;
   flex: 3.5;
   overflow-x: scroll;
   &::-webkit-scrollbar {
      width: 0px;
   }
   @media screen and (max-width: 660px) {
      div {
         min-width: 90%;
      }
   }
`;

export const Contact = styled.form`
   display: flex;
   flex: 3.5;
   flex-direction: column;
   justify-content: space-between;
`;

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
   display: flex;
   flex-direction: column;
   width: 70vw;
   height: 80vh;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   background: ${colors.glassBg};
   border-radius: 20px;
   backdrop-filter: blur(${others.blur}px);
   -webkit-backdrop-filter: blur(${others.blur}px);
   border: 1px solid ${colors.glassBorder};
   box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
   padding: 40px 60px 40px 60px;
   animation: initialize ease 250ms;

   @media screen and (max-width: 910px) {
      overflow-y: scroll;

      #header {
         div {
            div {
               width: 100%;
               display: flex;
               justify-content: center;
               ${ImageContainer} {
                  float: none;
                  margin: 10px 0 10px 0;
                  max-width: 150px;
               }
            }
            flex-direction: row;
            align-items: center;
            text-align: center;
         }
      }

      ${BigContainer} {
         margin-top: 30px;
         min-height: 200px;
      }

      ${Contact} {
         margin-top: 30px;
         min-height: 240px;
      }
   }

   .icon-close {
      position: absolute;
      color: white;
      top: 25px;
      right: 25px;
      cursor: pointer;
      z-index: 3;
   }
`;

export const SmallContainer = styled.div`
   display: flex;
   flex: 0.3;
   flex-direction: column;
   text-align: center;
   min-height: 100%;
   min-width: 330px;
`;

export const Text = styled.p`
   max-height: 180px;
   overflow-y: scroll;
   padding: 0 10px 0 10px;

   &::-webkit-scrollbar {
      background: none;
      width: 5px;
   }

   &::-webkit-scrollbar-thumb {
      background-color: ${colors.glassBorder};
      border-radius: 10px;
   }
`;

export const HighlightInput = styled.input`
   border: 1px solid ${colors.glassBorder};
   border-radius: 10px;
   height: 80%;
   width: 100%;
`;

export const HighlightTextArea = styled.textarea`
   border: 1px solid ${colors.glassBorder};
   border-radius: 10px;
   height: 80%;
   width: 100%;
   resize: none;
`;

export const SubmitButton = styled.button`
   border: none;
   border-radius: 10px;
   height: 80%;
   width: 100%;
   background-color: ${colors.highlight};
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;

   p {
      color: black;
   }

   .loading-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid white;
      border-top: 3px solid black;
      animation: loading 1s ease-in-out infinite;

      @keyframes loading {
         to {
            transform: rotate(360deg);
         }
      }
   }
`;
