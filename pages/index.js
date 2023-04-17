import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import StarsBackground from '../components/StarsBackground';
import { Space_Grotesk } from 'next/font/google';
import Header from '../components/Header';
import { Html, OrbitControls } from '@react-three/drei';
import WordsSphere from '../components/WordsSphere';
import StarsList from '../components/StarsList';
import { tools } from '../styles/constants';

const space_grotesk = Space_Grotesk({ subsets: ['latin'] });

function lerp(prevV, newV, amt = 0.1) {
  //This function is used to calculate a number between two values
  //If 'amt' value is next to 0, the returned value will be next to the 'prevV' (previous value)
  //If 'amt' value is next to 1, the returned will be next to the 'newV'
  return (1 - amt) * prevV + amt * newV;
}

const TransitionScreen = React.forwardRef((props, ref) => {
  const transitionRef = useRef();
  const valueRef = useRef(0);

  useFrame(() => {
    //Here I set a value to the TransitionComponent background for each frame
    //When theres no transition to make (value == 0), the change is ignored
    if (transitionRef.current && ref.current?.transition.value != 0) {
      //Here I use the value from the transition to make a incrementation
      valueRef.current += Math.abs(ref.current.transition.value);
      if (ref.current.transition.value > 0) {
        //When it is GOING TO a screen:
        transitionRef.current.style.background =
          'radial-gradient(circle, rgba(250, 250, 250, 1)' +
          valueRef.current +
          '%, rgba(250, 250, 250, 0)' +
          valueRef.current * 1.2 +
          '%) no-repeat';
      } else {
        //When its COMING FROM a screen:
        transitionRef.current.style.background =
          'radial-gradient(circle, rgba(250, 250, 250, 0)' +
          valueRef.current +
          '%, rgba(250, 250, 250, 1)' +
          valueRef.current * 1.2 +
          '%) no-repeat';
      }
      //If it reaches the maximum, it will stop and reset to start any next transition
      if (valueRef.current == 100) {
        ref.current.transition.value = 0;
        valueRef.current = 0;
      }
    }
  });

  return (
    <Html fullscreen style={{ transform: 'translate(50%,50%)', pointerEvents: 'none' }}>
      <TransitionBackground ref={transitionRef} />
    </Html>
  );
});

const StarsScreen = React.forwardRef((props, ref) => {
  const posRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (props.transition) {
      //Will setReady every time but the first one
      props.setReady();
    }
  }, []);

  useFrame(() => {
    if (posRef.current) {
      //smothing the mouse position change event
      const valueX = lerp(mouseRef.current.x, ref.current.mouseTrack.x);
      const valueY = lerp(mouseRef.current.y, ref.current.mouseTrack.y);

      mouseRef.current = { x: valueX, y: valueY };

      //mouseX and mouseY are mapped: -1 to 1 (-1 is extreme left, 1 is extreme right)
      const mouseX = (valueX / window.innerWidth) * 2 - 1;
      const mouseY = (valueY / window.innerHeight) * 2 - 1;

      //changing the rotation of the stars
      posRef.current.rotation.y = (mouseX * Math.PI) / 8;
      posRef.current.rotation.x = (mouseY * Math.PI) / 12;
    }
  });

  return (
    <>
      <group ref={posRef} position={[0, 0, 0]}>
        <StarsBackground ref={ref} />
      </group>
    </>
  );
});

const Screens = React.forwardRef((props, ref) => {
  const [screen, setScreen] = useState({ number: -1, transition: false });
  const { camera } = useThree();
  ref.current = { ...ref.current, tools };

  useEffect(() => {
    //Resets the camera to default setting every time the screen changes
    camera.position.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.fov = 75;
    camera.aspect = 5.510263929618769;
    camera.far = 1000;
    camera.near = 0.1;
  }, [screen]);

  const startTransition = () => {
    const transitionV = 2; //Transition velocity
    const transtionS = ref.current.transition;
    //The value of the transition will be used in the TransitionScreen component
    //It is more likely a velocity value, it will be used in a incrementation
    ref.current.transition.value = transtionS.isTransitioning ? -transitionV : transitionV;
    ref.current.transition.isTransitioning = !transtionS.isTransitioning;
  };

  const changeScreen = (index) => {
    startTransition();
    //Wait one second before setting the new page (transition time)
    setTimeout(() => {
      setScreen({ number: index, transition: true });
    }, 1000);
  };

  const onHeaderClick = (index) => {
    //This function will do nothing if the user is already on the page
    if (screen.number == -1 && screen.number != index) {
      const maxVelocity = ref.current.stars.maxVelocity;
      let newVelocity = ref.current.stars.currentVelocity;
      //A interval setted to make a acceleration effect to the stars movement
      const interval = setInterval(() => {
        newVelocity += ref.current.stars.acceleration;
        ref.current.stars.currentVelocity = newVelocity;
        if (newVelocity >= maxVelocity) {
          //When reach the max speed, it will start the transition and change the screen
          changeScreen(index);
          clearInterval(interval);
        }
      }, 10);
    } else if (screen.number != index) {
      ref.current.stars.currentVelocity = ref.current.stars.initialVelocity;
      changeScreen(-1);
    }
  };

  const handleItemClick = (item) => {
    if (item.position) {
      ref.current.cameraSettings.lookingAt = item.position;
    }
  };

  return (
    <>
      <Html
        fullscreen
        style={{ transform: 'translate(50%,50%)', position: 'absolute', pointerEvents: 'none' }}
      >
        <Header onClick={onHeaderClick} />
        {screen.number == 0 ? <StarsList ref={ref} handleItemClick={handleItemClick} /> : null}
        {screen.number == -1 ? (
          <TextContainer>
            <Title>O UNIVERSO DO DESENVOLVIMENTO WEB</Title>
            <Subtitle>UMA JORNADA DE CONHECIMENTO E CRIATIVIDADE</Subtitle>
          </TextContainer>
        ) : null}
      </Html>
      {screen.number == 0 ? <WordsSphere ref={ref} setReady={startTransition} /> : null}
      <TransitionScreen ref={ref} />
      {screen.number == -1 ? (
        <StarsScreen ref={ref} setReady={startTransition} transition={screen.transition} />
      ) : null}
    </>
  );
});

export default function Home() {
  //This is the reference for each of the screens components, they use their own ref and the mouseTrack
  const screensRefs = useRef({
    //Mouse position relative to the Canva component
    mouseTrack: {
      x: 0,
      y: 0,
    },
    cameraSettings: {
      lookingAt: null,
    },
    //TransitionScreen reference, the value is used to increase(>0), decrease(<0) or do nothing (=0)
    transition: {
      value: 0,
      isTransitioning: false,
    },
    //This is the first screen reference, used to change the stars velocity with a certain acceleration
    stars: {
      initialVelocity: 1,
      currentVelocity: 1,
      maxVelocity: 30,
      acceleration: 0.1,
    },
  });

  const handleMouseMove = (event) => {
    screensRefs.current.mouseTrack = { x: event.clientX, y: event.clientY };
  };

  return (
    <Container>
      <Canvas
        onMouseMove={handleMouseMove}
        style={{ backgroundColor: '#090909' }}
        resize={{ scroll: false }}
        camera={{ position: [0, 0, 0], fov: 75, far: 1000 }}
      >
        <Screens ref={screensRefs} />
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
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: ${space_grotesk.style.fontFamily};
  pointer-events: none;
  z-index: -1;
`;

const Title = styled.div`
  text-align: center;
  color: white;
  z-index: 1;
  font-size: 60px;
  font-weight: normal;
  pointer-events: none;
  line-height: 40px;
`;

const Subtitle = styled.div`
  text-align: center;
  z-index: 1;
  font-size: 35px;
  font-weight: bold;
  -webkit-text-stroke: 0.5px #fff;
  -webkit-text-fill-color: transparent;
  pointer-events: none;
`;

const TransitionBackground = styled.div`
  width: 100%;
  height: 100%;
`;
