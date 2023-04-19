import styled from 'styled-components';
import { Space_Grotesk } from 'next/font/google';
import { colors, others } from '../../styles/constants';

const space_grotesk = Space_Grotesk({ subsets: ['latin'] });

export const Container = styled.div`
  pointer-events: auto;
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
  background: ${colors.glassBg};
  backdrop-filter: blur(${others.blur}px);
  -webkit-backdrop-filter: blur(${others.blur}px);
  border-radius: 10px;
  border: 1px solid ${colors.glassBorder};

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

export const Item = styled.div`
  pointer-events: auto;
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
    color: ${colors.highlight};
    scale: 1.5;
  }
`;
