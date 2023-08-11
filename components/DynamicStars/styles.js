import styled from "styled-components";

export const StarCircle = styled.div`
   pointer-events: auto;
   position: absolute;
   top: ${({ sSize }) => -(sSize * 20 + sSize)}px;
   left: ${({ sSize }) => -(sSize * 20 + sSize)}px;
   width: ${({ sSize }) => sSize * 40}px;
   height: ${({ sSize }) => sSize * 40}px;
   border-radius: 50%;
   border: 5px solid white;
   transition: all 0.3s ease-in-out;
`;

export const StarTitle = styled.span`
   pointer-events: auto;
   letter-spacing: 20px;
   font-size: 600px;
   padding: 50px;
   transition: all 0.3s ease-in-out;
   user-select: none;
   color: white;
`;
