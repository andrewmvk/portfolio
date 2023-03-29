import { PointMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const starSize = 1; //Star radius
const amount = 5000; //Stars amount
const boxSize = 2000; //Stars spread radius
const rotation = 0.001; //Stars rotation over time

const Generate = () => {
  const starVertices = [];
  for (let i = 0; i < amount; i++) {
    const x = (Math.random() - 0.5) * boxSize;
    const y = (Math.random() - 0.5) * boxSize;
    const z = Math.random() * -boxSize;
    starVertices.push(x, y, z);
  }
  return starVertices;
};
const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(Generate(), 3));

export default function StarsBackground({ velocity }) {
  const starRefOne = useRef();
  const starRefTwo = useRef();

  useFrame(() => {
    if (starRefOne.current) {
      starRefOne.current.rotation.z += rotation;
      starRefOne.current.position.z += velocity;
      starRefTwo.current.rotation.z += rotation;
      starRefTwo.current.position.z += velocity;

      if (starRefOne.current.position.z > boxSize) {
        starRefOne.current.position.z = -(boxSize / 2 + 1);
      } else if (starRefTwo.current.position.z > boxSize) {
        starRefTwo.current.position.z = -(boxSize / 2 + 1);
      }
    }
  });

  return (
    <>
      <points ref={starRefOne}>
        <bufferGeometry attach="geometry" {...starGeometry} />
        <PointMaterial
          transparent
          opacity={0.9}
          color="#ffffff"
          size={starSize}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
      <points ref={starRefTwo} position={[0, 0, -boxSize / 2]}>
        <bufferGeometry attach="geometry" {...starGeometry} />
        <PointMaterial
          transparent
          opacity={0.9}
          color="#ffffff"
          size={starSize}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </points>
    </>
  );
}
