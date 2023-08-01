import * as THREE from "three";

const PlanetTrail = ({ position }) => {
   const tiltAngle = Math.atan(position[1] / position[2]);

   return (
      <mesh rotation={[Math.PI / 2 - tiltAngle, 0, 0]}>
         <torusGeometry
            args={[position[2], 0.1, 4, Math.abs(position[2]) * 1.5]}
         />
         <meshBasicMaterial color="#f0f0f0" side={THREE.DoubleSide} />
      </mesh>
   );
};

export default PlanetTrail;
