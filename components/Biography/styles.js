import styled from "styled-components";
import { colors, others } from "../../styles/constants";

export const OuterContainer = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   pointer-events: none;
   width: 100vw;
   height: 100vh;
`;

export const ImageContainer = styled.div`
   width: 130px;
   height: 130px;
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 50%;
   margin-right: 50px;
   float: left;
   border: 2px solid ${colors.glassBorder};

   img {
      object-fit: cover;
      max-width: 100%;
   }

   @media screen and (max-width: 1700px) {
      width: 110px;
      height: 110px;
   }
`;

export const BigContainer = styled.div`
   display: flex;
   justify-content: space-between;
   min-height: 200px;
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
   min-height: 220px;
   flex-direction: column;
   justify-content: space-between;
`;

export const Container = styled.div`
   pointer-events: auto;
   position: absolute;
   display: flex;
   align-items: center;
   justify-content: center;
   overflow: hidden;
   width: 70vw;
   height: 80vh;
   opacity: 0;
   top: 50%;
   left: 50%;
   transform: translate(-50%, 50%);
   border-radius: 20px;
   box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
   padding: 40px 60px 40px 60px;
   transition: 0.3s ease;
   background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.01),
      rgba(255, 255, 255, 0)
   );

   .scroll-div {
      display: flex;
      flex-direction: column;
      overflow-y: scroll;
      height: 100%;
      width: 100%;
      padding: 2px;

      &::-webkit-scrollbar {
         width: 0;
         @media screen and (max-height: 850px) {
            width: 8px;
            padding: 4px;
            border-radius: 10px;
            background-color: rgba(19, 20, 22, 0.5);
            &:hover {
               background-color: rgba(19, 20, 22, 1);
            }
         }
      }
      &::-webkit-scrollbar-thumb {
         background-color: #313439;
         border-radius: 10px;
      }
   }

   #header {
      min-height: 150px;
   }

   @media screen and (max-width: 910px) {
      flex-direction: column;

      #header {
         div {
            div {
               width: 100%;
               display: flex;
               justify-content: center;
               ${ImageContainer} {
                  float: none;
                  margin: 10px 0 10px 0;
                  max-width: 110px;
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

   .close {
      position: absolute;
      top: 25px;
      right: 25px;
      display: flex;
      align-items: center;
      justify-content: center;

      #icon-close {
         appearance: none;
      }

      label {
         padding: 15px;
         position: absolute;
         width: fit-content;
         height: fit-content;
         cursor: pointer;

         .bar {
            position: absolute;
            background-color: white;
            width: 25px;
            height: 3px;
            border-radius: 5px;
         }

         .bar:nth-child(1) {
            transform: rotateZ(-45deg);
         }
         .bar:nth-child(2) {
            transform: rotateZ(45deg);
         }
      }
   }
`;

export const SmallContainer = styled.div`
   display: flex;
   flex: 0.3;
   flex-direction: column;
   text-align: center;
   min-height: 100%;
   min-width: 330px;

   @media screen and (max-width: 1700px) {
      min-width: 280px;
   }
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
   min-height: 80%;
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
   min-height: 80%;
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
