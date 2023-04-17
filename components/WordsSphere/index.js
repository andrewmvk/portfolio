import * as THREE from 'three';
import React, { useRef, useState, useMemo, useCallback, Suspense, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Point, PointMaterial, Points, Stars } from '@react-three/drei';
import { StarCircle, StarTitle } from './styles';
import Planet from '../Planet';
import { random } from 'maath';
import { colors, letters } from '../../styles/constants';

const Word = ({ children, revealedWord, position }) => {
  const [wordData, setWordData] = useState({ word: children, revealed: false });
  const circleRef = useRef();
  const ref = useRef();
  const sSize = 8;

  const over = (e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (ref.current) ref.current.style.color = colors.highlight;
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
          newWord += letters[Math.floor(Math.random() * letters.length)];
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
};

const Cloud = React.forwardRef((props, ref) => {
  // const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 10 }));
  const cloudsRef = useRef();

  useFrame(({ clock }) => {
    // if (ref.current?.isDragging && cloudsRef.current) {
    //   cloudsRef.current.rotation.x += ref.current.y * 0.002;
    //   cloudsRef.current.rotation.y += ref.current.x * 0.002;
    // }
    // const elapsedTime = clock.getElapsedTime(); // Get the elapsed time since the component mounted
    // cloudsRef.current.rotation.y = (-29 * Math.PI) / 180; // Rotate the sphere around the y-axis
    // cloudsRef.current.rotation.z = elapsedTime / 6;
  });

  const words = useMemo(() => {
    const temp = [];
    const spherical = new THREE.Spherical();
    const thetaSpan = Math.PI * 2;
    const phiSpan = Math.PI;

    for (let i = 0; i < ref.current.tools.length; i++) {
      let word = '';
      for (let j = 0; j < ref.current.tools[i].name.length; j++) {
        word += letters[Math.floor(Math.random() * letters.length)];
      }

      const phi = phiSpan * Math.random() * props.radius;
      const theta = thetaSpan * Math.random() * props.radius;

      const wordPos = new THREE.Vector3().setFromSpherical(spherical.set(props.radius, phi, theta));

      const originalWord = ref.current.tools[i].name;
      //This is a array that contains the word position, the 'cryptographic format' of the word and the word itself
      temp.push([wordPos, word, originalWord]);
      ref.current.tools[i] = { name: originalWord, position: wordPos };
    }
    return temp;
  }, [props.radius]);

  return (
    <group ref={cloudsRef}>
      {/* <Points positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points> */}
      <Points>
        <PointMaterial transparent vertexColors sizeAttenuation depthWrite={false} />
        {words.map(([pos, word, revealedWord], index) => (
          <Word key={index} revealedWord={revealedWord} position={pos} children={word} />
        ))}
      </Points>
      <Stars fade speed={0.5} />
    </group>
  );
});

export default React.forwardRef((props, ref) => {
  useEffect(() => {
    props.setReady();
  }, []);

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={null}>
        <Planet position={[0, -2.5, 0]} ref={ref} />
      </Suspense>
      <Cloud radius={200} ref={ref} />
    </>
  );
});
