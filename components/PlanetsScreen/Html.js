import React, { useEffect } from "react";
import Modal from "../../components/Modal";
import Project from "../../components/Project";
import Biography from "../../components/Biography";
import StarsList from "../StarsList";

const PlanetsScreenHtml = React.forwardRef((props, ref) => {
   useEffect(() => {
      document.body.style.cursor = "grab";
      const mouseDown = () => (document.body.style.cursor = "grabbing");
      const mouseUp = () => (document.body.style.cursor = "grab");

      document.body.addEventListener("mousedown", mouseDown);
      document.body.addEventListener("mouseup", mouseUp);

      return () => {
         document.body.removeEventListener("mousedown", mouseDown);
         document.body.removeEventListener("mouseup", mouseUp);
      };
   }, []);

   return (
      <>
         <Modal ref={ref} />
         <Project ref={ref} />
         <Biography ref={ref} />
         <StarsList ref={ref} />
      </>
   );
});

export default PlanetsScreenHtml;
