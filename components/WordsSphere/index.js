import * as THREE from 'three';
import { useRef, useState, useMemo, useCallback, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, Point, PointMaterial, Points, Stars } from '@react-three/drei';
import { StarCircle, StarTitle } from './styles';
import Planet from '../Planet';

const data = [
  'REACT',
  'CSS',
  'HTML',
  'JAVASCRIPT',
  'NODE',
  'NEXT.JS',
  'REACT NATIVE',
  'REANIMATED',
  'BLENDER',
  'GIT',
  'JAVA',
  'DESIGN',
  'FIGMA',
  'FIREBASE',
  'UI/UX',
  'SQL',
];
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function Word({ children, revealedWord, position }) {
  const [wordData, setWordData] = useState({ word: children, revealed: false });
  const circleRef = useRef();
  const ref = useRef();
  const sSize = 8;

  const over = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (ref.current) ref.current.style.color = '#fa2720';
    if (circleRef.current) circleRef.current.style.transform = 'scale(2)';
    if (!wordData.revealed) handleHover();
  };
  const out = () => {
    document.body.style.cursor = 'default';
    if (ref.current) ref.current.style.color = 'white';
    if (circleRef.current) circleRef.current.style.transform = 'scale(1)';
  };

  const handleHover = useCallback(() => {
    let iterations = 0;

    const interval = setInterval(() => {
      let newWord = '';
      for (let j = 0; j < revealedWord.length; j++) {
        if (j < iterations) {
          newWord += revealedWord[j];
        } else {
          newWord += LETTERS[Math.floor(Math.random() * 26)];
        }
      }

      if (iterations >= revealedWord.length) {
        setWordData({ word: newWord, revealed: true });
        clearInterval(interval);
      } else {
        setWordData({ ...wordData, word: newWord });
      }
      iterations++;
    }, 50);
  }, []);

  return (
    <group position={position}>
      <Point size={sSize} />
      <Html distanceFactor={10}>
        <StarCircle ref={circleRef} sSize={sSize} />
        <StarTitle
          ref={ref}
          onClick={() => console.log('clicked')}
          onPointerOver={over}
          onPointerOut={out}
        >
          {wordData.word}
        </StarTitle>
      </Html>
    </group>
  );
}

function Cloud({ radius = 100, isDragging, mouseTrack }) {
  const cloudsRef = useRef();

  useFrame((state, delta) => {
    cloudsRef.current.rotation.x -= delta / 10;
    cloudsRef.current.rotation.y -= delta / 15;
  });

  useEffect(() => {
    if (cloudsRef.current && isDragging) {
      cloudsRef.current.rotation.x += mouseTrack.y * 0.002;
      cloudsRef.current.rotation.y += mouseTrack.x * 0.002;
    }
  }, [mouseTrack]);

  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const phiSpan = Math.PI / (data.length + 1);
    const thetaSpan = (Math.PI * 2) / data.length;

    for (let i = 0; i < data.length; i++) {
      let word = '';
      for (let j = 0; j < data[i].length; j++) {
        word += LETTERS[Math.floor(Math.random() * 26)];
      }

      const phi = phiSpan * Math.random() * radius;
      const theta = thetaSpan * Math.random() * radius;

      const wordPos = new THREE.Vector3().setFromSpherical(spherical.set(radius, phi, theta));

      temp.push([wordPos, word, data[i]]);
    }
    return temp;
  }, [radius]);

  return (
    <group ref={cloudsRef}>
      <Points>
        <PointMaterial transparent vertexColors sizeAttenuation depthWrite={false} />
        {words.map(([pos, word, revealedWord], index) => (
          <Word key={index} revealedWord={revealedWord} position={pos} children={word} />
        ))}
      </Points>
      <Stars fade speed={0.5} />
    </group>
  );
}

export default () => {
  const [isDragging, setIsDragging] = useState(false);
  const [mouseTrack, setMouseTrack] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((event) => {
    setMouseTrack({ x: event.movementX, y: event.movementY });
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <Canvas
      onMouseMove={handleMouseMove}
      onPointerDown={handleMouseDown}
      onPointerUp={handleMouseUp}
      style={{ backgroundColor: '#131416', outline: 'none', border: 'none', padding: 0 }}
      resize={{ scroll: false }}
      camera={{ position: [0, 0, 1], fov: 75 }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Planet position={[0, -2.5, 0]} isDragging={isDragging} mouseTrack={mouseTrack} />
      </Suspense>
      {/* <OrbitControls enableZoom={false} target={[0, 0, 0]} rotateSpeed={0.5} position={[0, 0, 5]} /> */}
      <Cloud radius={200} isDragging={isDragging} mouseTrack={mouseTrack} />
    </Canvas>
  );
};
