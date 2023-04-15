import styled from 'styled-components';
import { Space_Grotesk } from 'next/font/google';

const space_grotesk = Space_Grotesk({ subsets: ['latin'] });

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  width: 250px;
  align-items: center;
  overflow-y: auto;
  transition: all 0.3s ease-in-out;
  padding: 15px 0px 15px 0px;
  border-style: solid;
  border-width: 2px 0px 2px 0px;
  border-color: white;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const Item = styled.div`
  display: flex;
  font-family: ${space_grotesk.style.fontFamily};
  font-size: 22px;
  text-align: center;
  align-items: center;
  font-weight: lighter;
  color: white;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  &:hover {
    scale: 1.5;
  }
`;
