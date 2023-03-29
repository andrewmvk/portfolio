import { useRef, useState } from 'react';
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

const CustomStars = ({ velocity }) => {
  const ref = useRef();
  const mouse = useLerpedMouse();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = (mouse.current.x * Math.PI) / 50;
      ref.current.rotation.x = (mouse.current.y * Math.PI) / 100;
      ref.current.position.x = mouse.current.x * 100;
      ref.current.position.y = mouse.current.y * 30;
    }
  });

  return (
    <group ref={ref} position={[0, 0, 0]}>
      <StarsBackground velocity={velocity} />
    </group>
  );
};

export default function Home() {
  const [velocity, setVelocity] = useState(1);
  const maxV = 30;
  const opacity = 1 - (velocity * 2) / maxV;

  const onHeaderClick = (index) => {
    const acceleration = 0.1;
    let newVelocity = velocity;
    const interval = setInterval(() => {
      newVelocity += acceleration;
      setVelocity(newVelocity);
      if (newVelocity >= maxV) clearInterval(interval);
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
      <Header onClick={onHeaderClick} opacity={opacity} maxV={maxV} />
      <Title style={{ opacity }}>O UNIVERSO DO DESENVOLVIMENTO WEB</Title>
      <Canvas style={{ backgroundColor: '#131416', zIndex: 1 }} camera={{ fov: 90 }}>
        <CustomStars velocity={velocity} />
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
