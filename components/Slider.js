import React, { useState } from 'react';
import styled from 'styled-components';
import { others } from '../styles/constants';

export default React.forwardRef((props, ref) => {
  const [value, setValue] = useState(100);

  const handleOnChange = (event) => {
    setValue(event.target.value);
    console.log(event.target.value, ref.current.stars.maxVelocity);
    ref.current.stars.maxVelocity = (30 * event.target.value) / 100;
  };

  return (
    <>
      <RoundContainer>
        <Text>{value + '%'}</Text>
      </RoundContainer>
      <Container>
        <div style={{ width: '100%', transform: 'translate(50%, -50%) rotate(-90deg)' }}>
          <Slide value={value} onChange={handleOnChange} type="range" />
        </div>
      </Container>
    </>
  );
});

const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 5%;
`;

const Slide = styled.input`
  pointer-events: auto;
  width: 250px;
  height: 12px;
  -webkit-appearance: none;
  background: rgba(0, 0, 0, 0);
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 24px;
    background-color: #a4a4a4;
    border-radius: 12px;
  }

  &:hover {
    border: 1px solid white;
    &::-webkit-slider-thumb {
      background-color: white;
    }
  }
`;

export const RoundContainer = styled.div`
  bottom: 2%;
  right: 2%;
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Text = styled.span`
  text-align: center;
  font-family: ${others.fontFamily};
  font-size: 30px;
  font-weight: lighter;
  color: white;
`;
