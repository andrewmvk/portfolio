import React from 'react';
import styled from 'styled-components';
import { colors, others } from '../styles/constants';

export default () => {
  return (
    <Container>
      <Inner>
        <Text>LOREM IPSUM</Text>
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
  cursor: pointer;
`;

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  max-width: 200px;
  border: 1px dashed white;
  border-radius: 50px;
`;

const Text = styled.div`
  font-family: ${others.fontFamily};
  font-weight: lighter;
  font-size: 19px;
  padding: 5px 20px 5px 20px;
  color: ${colors.text};
`;
