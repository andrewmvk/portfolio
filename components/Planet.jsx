import React, { useMemo, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import vertex from '../shaders/vertex';
import atmosphereFragment from '../shaders/atmosphereFragment';
import geometryFragment from '../shaders/geometryFragment';

export default React.forwardRef((props, ref) => {
  const hover = useRef(false);
  const groupRef = useRef();
  const cameraRef = useRef();
  const radius = 2.5;
  const phi = (90 * Math.PI) / 180;

  const { camera } = useThree();

  function lerp(prevV, newV, amt = 0.1) {
    return (1 - amt) * prevV + amt * newV;
  }

  useFrame(({ clock }) => {
    if (cameraRef.current) {
      const elapsedTime = clock.getElapsedTime() * 3;
      const theta = (elapsedTime * Math.PI) / 180;
      const x = radius * Math.cos(theta);
      const z = radius * Math.sin(theta);
      const y = 0;

      //Smothing the mouse position change
      const valueX = ref.current.mouseTrack.x;
      const valueY = ref.current.mouseTrack.y;

      //Calculate the mouse position relative to the current viewport width and height
      const mouseX = (valueX / window.innerWidth) * 2 - 1;
      const mouseY = (valueY / window.innerHeight) * 2 - 1;

      //Calculate the angle of the camera target relative to the mouse position
      const angleX = theta - Math.PI / (2 + mouseX / 2); //in radians
      const angleY = phi - Math.PI / (2 - mouseY); //in radians #this value is correct?

      //Calculate the position of the target of the camera relative to the angles
      //It's like a another circle that is 100 times larger than the circle that the camera is following
      const xT = radius * 100 * Math.cos(angleX);
      const zT = radius * 100 * Math.sin(angleX);
      const yT = radius * 100 * Math.sin(angleY);

      //setting the camera position and target to simulate a planetary orbit
      camera.position.set(x, y, z);
      const lookingAtPosition = ref.current.cameraSettings.lookingAt;

      if (lookingAtPosition) {
        const xL = lerp(cameraRef.current.target.x, lookingAtPosition.x, 0.01);
        const yL = lerp(cameraRef.current.target.y, lookingAtPosition.y, 0.01);
        const zL = lerp(cameraRef.current.target.z, lookingAtPosition.z, 0.01);
        cameraRef.current.target = new THREE.Vector3(xL, yL, zL);
        // camera.zoom = lerp(camera.zoom, 5);
        // camera.fov = lerp(camera.fov, 50, 0.01);
      } else {
        const xL = lerp(cameraRef.current.target.x, xT, 0.01);
        const yL = lerp(cameraRef.current.target.y, yT, 0.01);
        const zL = lerp(cameraRef.current.target.z, zT, 0.01);
        cameraRef.current.target = new THREE.Vector3(xL, yL, zL);
      }

      //chaging the geometry uniforms
      const children = groupRef.current.children
      for (let i = 0; i < 1; i++) {
        const uniforms = children[i].material.uniforms
        uniforms.uTime.value = clock.getElapsedTime() * 0.4;
        uniforms.uIntensity.value = THREE.MathUtils.lerp(
          uniforms.uIntensity.value, //start point
          hover.current ? 0.85 : 0.15, //end point
          0.02 //interpolation factor
        )
      }
    }
  });

  const uniforms = useMemo(
    () => ({
      uIntensity: {
        value: 0.3,
      },
      uTime: {
        value: 0.0,
      }
    }),
    [],
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]} dispose={null} onPointerOver={() => (hover.current = true)}
    onPointerOut={() => (hover.current = false)}>
      <OrbitControls
        enableDamping={false}
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
        ref={cameraRef}
      />
      <mesh>
        <icosahedronGeometry args={[1.5, 40]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={geometryFragment}
          uniforms={uniforms}
        />
      </mesh>
      <mesh scale={1.05} >
        <icosahedronGeometry args={[1.5, 40]} />
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={atmosphereFragment}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          uniforms={uniforms}
        />
      </mesh>
    </group>
  );
});
