import React from 'react';
import styled from 'styled-components';
import { fontSize, others } from '../styles/constants';

export default () => {
  return (
    <Container>
      <Text>by Andrew Medeiros</Text>
    </Container>
  );
};

const Container = styled.div`
  pointer-events: auto;
  position: absolute;
  padding: 5px;
  top: 95%;
  left: 1%;
  display: inline-block;
  cursor: pointer;

  &:hover {
    span {
      color: #fff;
    }
  }
`;

const Text = styled.span`
  color: #5f5f5f;
  white-space: nowrap;
  font-family: ${others.fontFamily};
  font-size: ${fontSize.text};
  transition: all 0.3s ease-in-out;
`;
