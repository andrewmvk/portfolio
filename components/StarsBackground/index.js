import { PointMaterial, Segment, Segments } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

const starSize = 1; //Star radius
const amount = 5000; //Stars amount
const boxSize = 2000; //Stars spread radius
const rotation = 0.001; //Stars rotation over time
const maxTailLength = 50; //The maximum length of the star's tail
const velocity = 1;

const Generate = () => {
  const starsVertices = [];
  const segmentVertices = [];
  for (let i = 0; i < amount; i++) {
    const x = (Math.random() - 0.5) * boxSize;
    const y = (Math.random() - 0.5) * boxSize;
    const z = Math.random() * -boxSize;
    starsVertices.push(x, y, z);
    segmentVertices.push({ x, y, z });
  }
  return { starsVertices, segmentVertices };
};

const { starsVertices, segmentVertices } = Generate();
const starsGeometry = new THREE.BufferGeometry();
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));

export default React.forwardRef(function StarsBackground(props, ref) {
  const starRefOne = useRef();
  const starRefTwo = useRef();
  const lineGeoRef = useRef([]);
  const segmentsRef = useRef([]);

  useFrame(() => {
    if (starRefOne.current && starRefTwo.current) {
      starRefOne.current.rotation.z += rotation;
      starRefOne.current.position.z += ref.current;
      starRefTwo.current.rotation.z += rotation;
      starRefTwo.current.position.z += ref.current;

      segmentsRef.current.forEach((segment) => {
        const prevEnd = segment.end;
        const newEnd = prevEnd.z - ref.current / 70;
        const tailLength = Math.abs(newEnd - segment.start.z);
        if (tailLength < maxTailLength) segment.end.set(prevEnd.x, prevEnd.y, newEnd);
      });

      lineGeoRef.current.forEach((geo) => {
        if (geo)
          geo.material.linewidth = Math.min(1, geo.material.linewidth + ref.current * 0.0008);
      });

      if (starRefOne.current.position.z > boxSize) {
        starRefOne.current.position.z = -(boxSize / 2 + 1);
      } else if (starRefTwo.current.position.z > boxSize) {
        starRefTwo.current.position.z = -(boxSize / 2 + 1);
      }
    }
  });

  return (
    <>
      <group ref={starRefOne}>
        <points>
          <bufferGeometry attach="geometry" {...starsGeometry} />
          <PointMaterial
            transparent
            opacity={1}
            color="#ffffff"
            size={starSize}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </points>
        <Segments ref={(r) => (lineGeoRef.current[0] = r)} lineWidth={0} limit={amount + 1}>
          {segmentVertices.map((star, i) => {
            return (
              <Segment
                key={i}
                ref={(r) => (segmentsRef.current[i] = r)}
                color="white"
                start={[star.x, star.y, star.z]}
                end={[star.x, star.y, star.z]}
              />
            );
          })}
        </Segments>
      </group>
      <group ref={starRefTwo} position={[0, 0, -boxSize / 2]}>
        <points>
          <bufferGeometry attach="geometry" {...starsGeometry} />
          <PointMaterial
            transparent
            opacity={0.9}
            color="#ffffff"
            size={starSize}
            sizeAttenuation={true}
            depthWrite={false}
          />
        </points>
        <Segments ref={(r) => (lineGeoRef.current[1] = r)} lineWidth={0} limit={amount + 1}>
          {segmentVertices.map((star, i) => {
            return (
              <Segment
                key={i + amount}
                ref={(r) => (segmentsRef.current[i + amount] = r)}
                color="white"
                start={[star.x, star.y, star.z]}
                end={[star.x, star.y, star.z]}
              />
            );
          })}
        </Segments>
      </group>
    </>
  );
});
