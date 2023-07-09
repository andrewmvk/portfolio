import React from "react";
import Sun from "./planets/Sun";
import OceanPlanet from "./planets/OceanPlanet";
import DesertPlanet from "./planets/DesertPlanet";
import WhiteHole from "./planets/WhiteHole";
import LonelyMoon from "./planets/LonelyMoon";

const SolarSystem = () => {
   return (
      <>
         <DesertPlanet position={[0, 2, -30]} />
         <WhiteHole position={[0, -2, -180]} />
         <Sun />
         <LonelyMoon position={[0, -2, 120]} />
         <OceanPlanet position={[0, 1, 80]} />
      </>
   );
};

export default SolarSystem;
