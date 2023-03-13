import { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import Planet from '../components/Planet';
import { OrbitControls } from '@react-three/drei';
import Background from '../components/Background';
import RandomizedWord from '../components/RandomizedWord';

export default function Home() {
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
      {/* <RandomizedWord text="TEXTO PARA VER A PALAVRA" /> */}
      <Background />
    </Container>
  );
}

const Container = styled.div`
  height: 960px;
  width: 100%;
  justify-content: center;
  align-items: center;

  canvas {
    height: 90%;
  }
`;
