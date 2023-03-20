import styled from 'styled-components';
import { Space_Grotesk } from 'next/font/google';

const space_grotesk = Space_Grotesk({ subsets: ['latin'] });

export const StarCircle = styled.div`
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
  font-family: ${space_grotesk.style.fontFamily};
  letter-spacing: 20px;
  font-size: 600px;
  padding: 50px;
  transition: all 0.3s ease-in-out;
  color: white;
`;
