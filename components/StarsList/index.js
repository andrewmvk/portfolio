import React, { useState } from "react";
import { Container } from "./styles";

const Item = ({ tech, index, handleItemClick }) => {
   const handleClick = () => {
      handleItemClick({ name: tech.name, position: tech.position }, index);
   };
   return <li onClick={handleClick}>{tech.name}</li>;
};

const SearchList = ({ technologies, handleItemClick }) => {
   const [query, setQuery] = useState("");

   return (
      <>
         <input
            type="text"
            placeholder="Buscar"
            className="search-box"
            onChange={e => setQuery(e.target.value)}
         />
         <ul className="names-list">
            {technologies
               .filter(tech => tech.name.toLowerCase().includes(query))
               .map((tech, index) => {
                  return (
                     <Item
                        key={index}
                        index={index}
                        tech={tech}
                        handleItemClick={handleItemClick}
                     />
                  );
               })}
         </ul>
      </>
   );
};

export default React.forwardRef((props, ref) => {
   const technologies =
      ref.current.locales.data[ref.current.locales.selected].technologies;

   const handleClick = e => {
      if (e.target.checked) {
         e.target.parentElement.style.transform = "translateX(0%)";
      } else {
         e.target.parentElement.style.transform = "translateX(-100%)";
      }
   };

   const handleItemClick = (item, index) => {
      ref.current.others.handleStarClick(item, index);
   };

   return (
      <Container className="shadow-div glass">
         <h2>FERRAMENTAS</h2>
         <SearchList
            technologies={technologies}
            handleItemClick={handleItemClick}
         />
         <input type="checkbox" id="menu-button" onChange={handleClick} />
         <label forhtml="menu-button" className="menu-icon">
            <div className="single-bar" />
            <div className="single-bar" />
            <div className="single-bar" />
         </label>
      </Container>
   );
});
