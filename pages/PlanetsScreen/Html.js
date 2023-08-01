import React from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Project from "../../components/Project";
import Biography from "../../components/Biography";

const PlanetsScreenHtml = React.forwardRef((props, ref) => {
   return (
      <>
         <Modal ref={ref} />
         <Button text="ILLUSION" ref={ref} />
         <Project ref={ref} />
         <Biography ref={ref} />
      </>
   );
});

export default PlanetsScreenHtml;
