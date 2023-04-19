import React, { useRef } from 'react';
import { Container, Item } from './styles';

export default React.forwardRef(({ handleItemClick }, ref) => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);
  const itemHeight = 40;
  const containerHeight = window.innerHeight * 0.42;
  const amount = containerHeight / itemHeight;

  const handleScroll = () => {
    // //A function used to track the scroll and the items that are currently visible relative to it
    // const scrollPercentage = containerRef.current.scrollTop / (containerHeight - itemHeight);
    // const ceilItemIndex = (amount - 1) * scrollPercentage; //Top item boundry
    // const floorItemIndex = ceilItemIndex + (amount - 1); //Bottom item boundry
    // itemsRef.current.forEach((item, index) => {
    //   //For each item I seek those that are inside the boundries
    //   if (index >= ceilItemIndex && index <= floorItemIndex) {
    //     //Inside
    //     item.style.opacity = 1;
    //   } else {
    //     //Outside
    //     item.style.opacity = 0;
    //   }
    // });
  };

  return (
    <Container ref={containerRef} onScroll={handleScroll} style={{ maxHeight: containerHeight }}>
      {ref.current.tools.map((item, index) => {
        return (
          <Item
            ref={(r) => (itemsRef.current[index] = r)}
            onClick={() => handleItemClick(item)}
            style={{ minHeight: itemHeight }}
            key={index}
          >
            {item.name}
          </Item>
        );
      })}
    </Container>
  );
});
