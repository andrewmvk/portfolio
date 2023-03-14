import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #131416;
`;

export const StarHighlight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size * 10}px;
  height: ${({ size }) => size * 10}px;
  border-radius: 50%;
  border: 1px dashed white;
  transition: all 0.3s ease-in-out;
`;

export const StarContainer = styled.div`
  position: absolute;
  top: ${({ top }) => Math.min(Math.max(top, 5 - Math.random() * 2), 94 - Math.random() * 5)}%;
  left: ${({ left }) => Math.min(Math.max(left, 5 - Math.random() * 2), 94 - Math.random() * 5)}%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .name {
    transition: all 0.2s ease-in-out;
  }

  &:hover > :not(.name) {
    transform: scale(2) rotateZ(180deg);
  }

  &:hover .name {
    transform: scale(1.5) translateY(${({ size }) => size * 3}px);
    * {
      opacity: 1;
    }
  }
`;

export const HoverableStar = styled.div`
  background-color: white;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;
  opacity: ${({ opacity }) => opacity};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const Star = styled.div`
  position: absolute;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: white;
  border-radius: 50%;
  opacity: ${({ opacity }) => opacity};
`;
