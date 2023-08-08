import React from "react";
import Modal from "../../components/Modal";
import Project from "../../components/Project";
import Biography from "../../components/Biography";
import { BsHandIndex } from "react-icons/bs";
import StarsList from "../StarsList";

const PlanetsScreenHtml = React.forwardRef((props, ref) => {
   return (
      <>
         <Modal ref={ref} />
         <Project ref={ref} />
         <Biography ref={ref} />
         <BsHandIndex className="hand-icon" size={32} />
         <StarsList ref={ref} />
      </>
   );
});

export default PlanetsScreenHtml;
