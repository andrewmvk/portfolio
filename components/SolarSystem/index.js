import React from "react";
import Sun from "./planets/Sun";
import OceanPlanet from "./planets/OceanPlanet";
import DesertPlanet from "./planets/DesertPlanet";
import GasPlanet from "./planets/GasPlanet";
import LonelyMoon from "./planets/LonelyMoon";

const SolarSystem = React.forwardRef(({ handlePlanetClick }, ref) => {
   return (
      <>
         <DesertPlanet
            position={[0, 2, -30]}
            onClick={planet => handlePlanetClick("none", planet)}
         />
         <GasPlanet
            position={[0, -2, -180]}
            onClick={planet => handlePlanetClick("none", planet)}
         />
         <Sun
            ref={ref}
            onClick={planet => handlePlanetClick("euquero", planet)}
         />
         <LonelyMoon
            position={[0, -2, 120]}
            onClick={planet => handlePlanetClick("none", planet)}
         />
         <OceanPlanet
            position={[0, 1, 80]}
            onClick={planet => handlePlanetClick("none", planet)}
         />
      </>
   );
});

export default SolarSystem;
