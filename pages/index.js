import { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from '@react-three/fiber';
import Planet from '../components/Planet';
import { OrbitControls } from '@react-three/drei';
import WordsSphere from '../components/WordsSphere';

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
      <WordsSphere />
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
