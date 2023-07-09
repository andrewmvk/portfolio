import { PointMaterial, Segment, Segments } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import * as THREE from 'three';

const starSize = 1; //Star radius
const amount = 5000; //Stars amount
const boxSize = 2000; //Stars spread radius
const rotation = 0.001; //Stars rotation over time
const maxTailLength = 50; //The maximum length of the star's tail

const generateStars = () => {
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

const { starsVertices, segmentVertices } = generateStars();
const starsGeometry = new THREE.BufferGeometry();
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));

export default React.forwardRef(function StarsBackground(props, ref) {
  const starRef = useRef([]);
  const segmentsRef = useRef([]);

  useFrame(() => {
    if (starRef.current) {
      const initialVelocity = ref.current.stars.initialVelocity;
      const currentVelocity = ref.current.stars.currentVelocity;
      const maxVelocity = ref.current.stars.maxVelocity;

      starRef.current.forEach((group) => {
        //Rotate and move the stars towards the camera
        group.rotation.z += rotation;
        group.position.z += currentVelocity;

        if (group.position.z > boxSize) {
          //When a stars group's extreme backside reaches the camera
          group.position.z = -(boxSize / 2);
          //The position of the stars group is "reseted"
        }

        if (currentVelocity != initialVelocity) {
          //If it starts to move more quickly than...
          const points = group.children[0]; //Stars points material
          const newOpacity = (maxVelocity - currentVelocity) / (maxVelocity - 1);
          //Opacity mapped relative to the stars velocity
          points.material.opacity = newOpacity * 0.5;

          //Here the stars segment starts to appear and become more thick
          const segment = group.children[1];
          segment.material.linewidth = Math.min(
            0.6,
            segment.material.linewidth + currentVelocity * 0.0008,
          );
        }
      });

      if (currentVelocity != initialVelocity) {
        //Here all the segments get longer relative to the initial velocity divided by a factor
        segmentsRef.current.forEach((segment) => {
          const prevEnd = segment.end;
          const newEnd = prevEnd.z - currentVelocity / 70;
          const tailLength = Math.abs(newEnd - segment.start.z);
          if (tailLength < maxTailLength) segment.end.set(prevEnd.x, prevEnd.y, newEnd);
        });
      }
    }
  });

  return (
    <>
      <group ref={(r) => (starRef.current[0] = r)}>
        <points>
          <bufferGeometry attach="geometry" {...starsGeometry} />
          <PointMaterial
            color="#ffffff"
            size={starSize}
            sizeAttenuation={true}
          />
        </points>
        <Segments lineWidth={0} limit={amount + 1}>
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
      <group ref={(r) => (starRef.current[1] = r)} position={[0, 0, -boxSize / 2]}>
        <points>
          <bufferGeometry attach="geometry" {...starsGeometry} />
          <PointMaterial
            transparent
            opacity={0.9}
            color="#ffffff"
            size={starSize}
            sizeAttenuation={true}
          />
        </points>
        <Segments lineWidth={0} limit={amount + 1}>
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
