import React from "react";
import styled from "styled-components";

export default () => {
   return (
      <Container>
         <Text href="https://github.com/andrewmvk/portfolio" target="_blank">
            by Andrew Medeiros
         </Text>
      </Container>
   );
};

const Container = styled.div`
   pointer-events: auto;
   position: absolute;
   padding: 5px;
   top: 95%;
   left: 1%;
   display: inline-block;
   cursor: pointer;
`;

const Text = styled.a`
   color: #5f5f5f;
   white-space: nowrap;
   transition: all 0.3s ease-in-out;
   &:hover {
      color: #fff;
   }
`;
