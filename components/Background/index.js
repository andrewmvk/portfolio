import React, { useState } from 'react';
import RandomizedWord from '../RandomizedWord';
import { Container, HoverableStar, Star, StarContainer, StarHighlight } from './styles';

const generateStars = (amount) => {
  const stars = [];
  for (let i = 0; i < amount; i++) {
    let top = Math.floor(Math.random() * 100);
    let left = Math.floor(Math.random() * 100);
    if (stars.some((s) => Math.abs(s.top - top) < 2 && Math.abs(s.left - left) < 2)) {
      top += top > 95 ? -5 : 5;
      left += left > 95 ? -5 : 5;
    }
    const size = Math.floor(Math.random() * 3) + 2;
    const minOpacity = 0.5;
    const opacity = Math.random() * (1 - minOpacity) + minOpacity;
    stars.push({ top, left, size, opacity });
  }
  return stars;
};

const SpecialStar = ({ star, text }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <StarContainer {...star} onMouseEnter={() => setHovered(true)}>
      <StarHighlight {...star}>
        <HoverableStar {...star} />
      </StarHighlight>
      <div className="name">
        <RandomizedWord hovered={hovered} star={star} text={text} />
      </div>
    </StarContainer>
  );
};

const data = [
  'React',
  'CSS',
  'HTML',
  'JavaScript',
  'Node',
  'Next.js',
  'React Native',
  'Reanimated',
  'Blender',
  'Git',
  'Java',
  'Design',
  'Figma',
  'Firebase',
  'UI/UX',
  'SQL',
];

export default () => {
  const specialStars = generateStars(data.length);
  const commonStars = generateStars(90);

  return (
    <Container>
      {specialStars.map((star, index) => (
        <SpecialStar star={star} text={data[index]} key={index} />
      ))}
      {commonStars.map((star, index) => (
        <Star key={index} {...star} />
      ))}
    </Container>
  );
};
