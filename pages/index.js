import React, { useRef } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import StarsBackground from '../components/StarsBackground';
import { Space_Grotesk } from 'next/font/google';
import Header from '../components/Header';
import { Html } from '@react-three/drei';

const space_grotesk = Space_Grotesk({ subsets: ['latin'] });

function useLerpedMouse() {
  const mouse = useThree((state) => state.mouse);
  const lerped = useRef(mouse.clone());
  useFrame(() => {
    lerped.current.lerp(mouse, 0.1);
  });
  return lerped;
}

const StarsScreen = React.forwardRef((props, ref) => {
  const posRef = useRef();
  const textRef = useRef([]);
  const mouse = useLerpedMouse();

  useFrame((state) => {
    if (posRef.current && textRef.current) {
      const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 0]);
      const x = (state.pointer.x * 100 * viewport.width) / 2;
      const y = (-1 * state.pointer.y * 100 * viewport.height) / 2;
      textRef.current.forEach((text) => {
        text.style.backgroundPositionX = (mouse.current.x * 100 * viewport.width) / 2 + 'px';
        text.style.backgroundPositionY = (-mouse.current.y * 100 * viewport.height) / 2 + 'px';
      });

      posRef.current.rotation.y = (mouse.current.x * Math.PI) / 50;
      posRef.current.rotation.x = (mouse.current.y * Math.PI) / 100;
      posRef.current.position.x = mouse.current.x * 100;
      posRef.current.position.y = mouse.current.y * 30;
    }
  });

  return (
    <>
      <Html fullscreen>
        <TextContainer>
          <Title style={{ paddingBottom: 50 }} ref={(r) => (textRef.current[0] = r)}>
            O UNIVERSO DO DESENVOLVIMENTO WEB
          </Title>
          <Subtitle style={{ paddingTop: 25 }} ref={(r) => (textRef.current[1] = r)}>
            UMA VIAGEM DE CONHECIMENTO E CRIATIVIDADE
          </Subtitle>
        </TextContainer>
      </Html>
      <group ref={posRef} position={[0, 0, 0]}>
        <StarsBackground ref={ref} />
      </group>
    </>
  );
});

export default function Home() {
  const initialVelocity = 1;
  const maxVelocity = 30;
  const starsRef = useRef([initialVelocity, initialVelocity, maxVelocity]);

  const onHeaderClick = (index) => {
    const acceleration = 0.1;
    let newVelocity = starsRef.current[1];
    const interval = setInterval(() => {
      newVelocity += acceleration;
      starsRef.current[1] = newVelocity;
      if (newVelocity >= maxVelocity) clearInterval(interval);
    }, 10);
  };

  return (
    <Container>
      {/* <Canvas className="canvas">
        <OrbitControls enableZoom={false} autoRotate />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <Planet />
        </Suspense>
      </Canvas> */}
      {/* <WordsSphere /> */}
      <Header onClick={onHeaderClick} />
      <Canvas style={{ backgroundColor: '#101010', zIndex: 1 }} camera={{ fov: 90 }}>
        <StarsScreen ref={starsRef} />
      </Canvas>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: ${space_grotesk.style.fontFamily};
`;

const Title = styled.div`
  position: absolute;
  width: 200%;
  height: 200%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-25%, -25%);
  z-index: 1;
  font-size: 60px;
  font-weight: bold;
  background: radial-gradient(circle, rgba(255, 255, 255, 0) 5%, rgba(255, 255, 255, 1) 5.5%)
    no-repeat;
  background-size: cover;
  -webkit-text-stroke: 0.5px #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  pointer-events: none;
`;

const Subtitle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${space_grotesk.style.fontFamily};
  font-size: 35px;
  font-weight: bold;
  background: radial-gradient(circle, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 0) 10.5%)
    no-repeat;
  background-size: cover;
  -webkit-text-stroke: 0.5px #fff;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  pointer-events: none;
`;
