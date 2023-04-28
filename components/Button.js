import React from 'react';
import styled from 'styled-components';
import { colors, fontSize, others } from '../styles/constants';

export default ({ text, onPress }) => {
  return (
    <Container onClick={onPress}>
      <Inner>
        <Text>{text}</Text>
      </Inner>
    </Container>
  );
};

const Container = styled.div`
  pointer-events: auto;
  display: flex;
  padding: 5px;
  border: 1px solid white;
  height: 50px;
  width: max-content;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 0px 15px 4px rgba(250, 208, 65, 0.2);

    div {
      border: 1px dashed ${colors.highlight};
    }

    span {
      text-shadow: 0px 0px 4px rgba(250, 208, 65, 0.75);
    }
  }
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  max-width: 200px;
  border: 1px dashed white;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
`;

const Text = styled.span`
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  font-family: ${others.fontFamily};
  font-weight: lighter;
  font-size: ${fontSize.button}px;
  padding: 5px 20px 5px 20px;
  color: ${colors.text};
  transition: all 0.3s ease-in-out;
  text-shadow: 0px 0px 4px black;
  z-index: 2;
`;
