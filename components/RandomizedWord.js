import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Space_Grotesk } from 'next/font/google';

const space_grotesk = Space_Grotesk({ subsets: ['latin'] });
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default ({ text, star, hovered }) => {
  const [randomWord, setRandomWord] = useState('');
  const word = text ? text.toUpperCase() : 'WORDS';

  useEffect(() => {
    let rWord = '';
    for (let i = 0; i < word.length; i++) {
      rWord += LETTERS[Math.floor(Math.random() * 26)];
    }
    setRandomWord(rWord);
  }, []);

  useEffect(() => {
    if (hovered) {
      handleHover();
    }
  }, [hovered]);

  const handleHover = useCallback(() => {
    let iterations = 0;

    const interval = setInterval(() => {
      let newWord = '';
      for (let j = 0; j < word.length; j++) {
        if (j < iterations) {
          newWord += word[j];
        } else {
          newWord += LETTERS[Math.floor(Math.random() * 26)];
        }
      }
      setRandomWord(newWord);

      if (iterations >= word.length) {
        clearInterval(interval);
      }
      iterations++;
    }, 50);
  }, []);

  return <Word {...star}>{randomWord}</Word>;
};

const Word = styled.span`
  color: white;
  opacity: 0.3;
  font-weight: lighter;
  letter-spacing: 2px;
  font-family: ${space_grotesk.style.fontFamily};
  font-size: ${({ size }) => Math.min(Math.max(size * 4, 15), 25)}px;
  transition: all 0.3s linear;

  &:hover {
    opacity: 1;
  }
`;
