import styled from 'styled-components';
import { Space_Grotesk } from 'next/font/google';
import { colors, fontSize } from '../../styles/constants';

const space_grotesk = Space_Grotesk({ subsets: ['latin'] });

const titleSize = fontSize.headerTitle;

export const Container = styled.div`
  left: 50%;
  top: 30px;
  position: fixed;
  flex-direction: row;
  justify-content: space-around;
  display: flex;
  height: 40px;
  width: 75%;
  z-index: 2;
  transform: translateX(-50%);
  pointer-events: none;
`;

export const Title = styled.div`
  pointer-events: auto;
  flex: 0.05;
  font-family: ${space_grotesk.style.fontFamily};
  font-size: ${titleSize}px;
  transition: all 0.3s ease-in-out;
  color: white;
  z-index: 2;
  cursor: pointer;

  div {
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    gap: 10px;
    * {
      transition: all 0.3s ease-in-out;
    }
  }

  .icon {
    position: absolute;
    scale: 1.5;
  }

  .title {
    opacity: 0;
    font-weight: medium;
  }

  .subtitle {
    position: absolute;
    font-size: ${fontSize.headerSubTitle}px;
    top: ${titleSize - 5}px;
    font-weight: lighter;
    opacity: 0;
  }

  &:hover {
    transform: translateX(-50%);
    .icon {
      transform: translateX(-80%);
      color: ${colors.highlight};
    }

    .title {
      transform: scale(1.5) translateX(50%);
      opacity: 1;
      color: ${colors.highlight};
    }

    .subtitle {
      transform: translate(51%, 10px);
      opacity: 1;
    }
  }
`;
