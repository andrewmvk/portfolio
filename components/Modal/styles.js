import styled from 'styled-components';
import { colors, fontSize, others } from '../../styles/constants';

export const Container = styled.div`
  pointer-events: auto;
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${colors.glassBg};
  width: 42%;
  height: 42%;
  border-radius: 20px;
  backdrop-filter: blur(${others.blur}px);
  -webkit-backdrop-filter: blur(${others.blur}px);
  border: 1px solid ${colors.glassBorder};
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  font-family: ${others.fontFamily};
  padding: 40px;

  @media screen and (max-width: 650px) {
    width: 70%;
  }
`;

export const Title = styled.span`
  letter-spacing: 2px;
  font-size: ${fontSize.title}px;
  font-weight: bold;
  color: ${colors.text};
`;

export const Subtitle = styled.span`
  letter-spacing: 2px;
  line-height: ${fontSize.subTitle}px;
  font-size: ${fontSize.subTitle}px;
  font-weight: 300;
  color: ${colors.text};
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

export const Text = styled.p`
  margin: 0;
  font-size: ${fontSize.text}px;
  text-align: justify;
  color: ${colors.text};
  font-weight: medium;
`;

export const LevelCountContainer = styled.div`
  display: flex;
  min-height: 100%;
  width: 20%;
  justify-content: center;
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
