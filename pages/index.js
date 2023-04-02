import React, { useRef } from 'react';
import styled from 'styled-components';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import StarsBackground from '../components/StarsBackground';
import { Space_Grotesk } from 'next/font/google';
import Header from '../components/Header';

const space_grotesk = Space_Grotesk({ subsets: ['latin'] });

function useLerpedMouse() {
  const mouse = useThree((state) => state.mouse);
  const lerped = useRef(mouse.clone());
  useFrame(() => {
    lerped.current.lerp(mouse, 0.1);
  });
  return lerped;
}

const CustomStars = React.forwardRef((props, ref) => {
  const posRef = useRef();
  const mouse = useLerpedMouse();

  useFrame(() => {
    if (posRef.current) {
      posRef.current.rotation.y = (mouse.current.x * Math.PI) / 50;
      posRef.current.rotation.x = (mouse.current.y * Math.PI) / 100;
      posRef.current.position.x = mouse.current.x * 100;
      posRef.current.position.y = mouse.current.y * 30;
    }
  });

  return (
    <group ref={posRef} position={[0, 0, 0]}>
      <StarsBackground ref={ref} />
    </group>
  );
});

export default function Home() {
  const starsRef = useRef(1);
  const maxVelocity = 30;

  const onHeaderClick = (index) => {
    const acceleration = 0.1;
    let newVelocity = starsRef.current;
    const interval = setInterval(() => {
      newVelocity += acceleration;
      starsRef.current = newVelocity;
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
      <Title>O UNIVERSO DO DESENVOLVIMENTO WEB</Title>
      <Canvas style={{ backgroundColor: '#131416', zIndex: 1 }} camera={{ fov: 90 }}>
        <CustomStars ref={starsRef} />
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

const Title = styled.div`
  font-family: ${space_grotesk.style.fontFamily};
  font-size: 60px;
  position: absolute;
  color: white;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
  width: 75%;
  top: 50%;
  left: 50%;
  text-align: center;
  z-index: 2;
  pointer-events: none;
`;
