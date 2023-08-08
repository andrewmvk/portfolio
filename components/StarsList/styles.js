import styled from "styled-components";
import { colors } from "../../styles/constants";

export const Container = styled.div`
   position: absolute;
   top: 0;
   left: 0;
   height: 100vh;
   width: 15vw;
   border-top-right-radius: 20px;
   border-bottom-right-radius: 20px;
   padding: 1.5%;
   display: flex;
   flex-direction: column;
   gap: 25px;
   transform: translateX(-100%);
   transition: all 0.3s ease-in-out;
   background: linear-gradient(
      -90deg,
      rgba(255, 255, 255, 0.01),
      rgba(255, 255, 255, 0)
   );

   @media screen and (max-width: 1700px) {
      width: 20vw;
      min-width: 230px;
   }

   h2 {
      text-align: center;
   }

   .search-box {
      background-color: #313439;
      font-size: 19px;
      border: none;
      padding: 15px 25px 15px 25px;
      border-radius: 20px;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);

      @media screen and (max-width: 1700px) {
         padding: 10px 20px 10px 20px;
      }
   }

   .names-list {
      margin-top: 10px;
      margin-bottom: 30px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      overflow-y: scroll;
      &::-webkit-scrollbar {
         width: 8px;
      }
      &::-webkit-scrollbar-track {
         padding: 4px;
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

      li {
         cursor: pointer;
         padding: 10px;
         border-radius: 10px;
         width: 92%;
         transition: all 0.3s ease-in-out;

         &:hover {
            color: black;
            background-color: ${colors.highlight};
         }
      }
   }

   #menu-button,
   .menu-icon {
      appearance: none;
      position: absolute;
      left: 115%;
      top: 2%;
      transform: translateX(-50%);
      height: 40px;
      width: 40px;
      border-radius: 50%;
   }

   #menu-button {
      opacity: 0;
      cursor: pointer;
   }

   .menu-icon {
      pointer-events: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 5px;
      gap: 4px;
      transition: all 0.3s ease-in-out;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);

      @keyframes initializeStarsListIcon {
         from {
            opacity: 0;
            transform: rotateZ(90deg);
         }
         to {
            opacity: 1;
            transform: rotateZ(0deg);
         }
      }

      .single-bar {
         width: 100%;
         height: 4px;
         border-radius: 3px;
         background-color: ${colors.highlight};
         transition: all 0.5s ease-in-out;
         animation: initializeStarsListIcon 0.3s ease;
      }

      .single-bar:nth-child(1) {
         animation-delay: 0.5;
      }
      .single-bar:nth-child(2) {
         animation-delay: 0.7s;
      }
      .single-bar:nth-child(3) {
         animation-delay: 0.9s;
      }

      @media screen and (max-width: 1700px) {
         width: 35px;
         height: 35px;
      }
   }

   #menu-button:checked {
      top: 5%;
      left: 100%;

      & + label {
         top: 5%;
         left: 100%;
         background-color: ${colors.highlight};
         * {
            width: 90%;
            background-color: #131416;
         }
         .single-bar:nth-child(1) {
            transform: translateY(8px) rotate(135deg);
         }
         .single-bar:nth-child(2) {
            transform: scale(0);
         }
         .single-bar:nth-child(3) {
            transform: translateY(-8px) rotate(-135deg);
         }
      }
   }
`;
