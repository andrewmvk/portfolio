import React, { useRef, useEffect, useState } from "react";
import { Vector3 } from "three";
import {
   Container,
   Image,
   ImageContainer,
   TextContainer,
   TitleContainer,
} from "./styles";
import { CgClose } from "react-icons/cg";
import { AiFillAndroid } from "react-icons/ai";
import { BsArrowDown, BsApple } from "react-icons/bs";
import {
   Expo,
   Firebase,
   GoogleMaps,
   ReactDark,
   ReactNavigation,
} from "../../public/projects/logos";

const resetedPositon = new Vector3(0, 0, 0);

export default React.forwardRef((props, ref) => {
   const imagesRef = useRef();
   const [data, setData] = useState({
      isVisible: false,
      projects: ["euquero"],
      project: "euquero",
   });

   const [texts, setTexts] = useState({
      title: "",
      name: "",
      description: "",
      check: "",
      tecnologies: "",
   });

   const handleLangChange = () => {
      const locale =
         ref.current.locales.data[ref.current.locales.selected].projects[
            data.project
         ];
      setTexts({
         title: locale.title,
         name: locale.name,
         description: locale.description,
         check: locale.check,
         tecnologies: locale.technologies,
      });
   };

   const handleShowProject = (project = "none", show = true) => {
      setData({ ...data, isVisible: show, project: project });
      if (show) {
         handleLangChange();
         ref.current.locales.remount = handleLangChange;
      } else {
         ref.current.others.onProjectClose();
         ref.current.cameraSettings.lookingAt = resetedPositon;
      }
   };

   useEffect(() => {
      // Set the function on the global ref so other components can call it
      // In this case, the function will be called when the user clicks in the planet ("PlanetsScreen")
      ref.current.others.setShowProject = handleShowProject;

      const keyDown = event => {
         if (event.keyCode === 27) {
            handleShowProject("none", false);
         }
      };
      document.addEventListener("keydown", keyDown);

      return () => {
         document.removeEventListener("keydown", keyDown);
      };
   }, []);

   const handleScroll = e => {
      const children = imagesRef.current.children;
      const translateRegex = /-?\d+(\.\d+)?/g;

      const handleNewStyle = (xIter, yIter) => {
         const preValues = children[0].style.transform
            .match(translateRegex)
            .map(Number);

         //See if it is in the boundries limit
         if (
            (preValues[0] > -40 || xIter > 0) &&
            (preValues[0] < 0 || xIter < 0)
         ) {
            //For each image...
            for (let i = 0; i < children.length; i++) {
               const transform = children[i].style.transform;
               let transformValues = transform
                  .match(translateRegex)
                  .map(Number);

               transformValues[0] += xIter * 2;
               transformValues[1] += yIter;

               const newTranslate =
                  "translate(" +
                  transformValues[0] +
                  "%," +
                  transformValues[1] +
                  "%)";

               children[i].style.transform = newTranslate;

               const opacity = +children[i].style.opacity;
               if (transformValues[0] > 0) {
                  children[i].style.opacity = "0";
               } else if (transformValues[0] == 0) {
                  children[i].style.opacity = "1";
                  children[i].style.border = "1px solid white";
               } else {
                  children[i].style.opacity = `${xIter * 0.075 + opacity}`;
                  children[i].style.border = "";
               }
            }
         }
      };

      const xIter = 5;
      const yIter = 4;
      if (e.deltaY < 0) {
         //SCROLL UP
         handleNewStyle(-xIter, -yIter);
      } else {
         //SCROLL DOWN
         handleNewStyle(+xIter, +yIter);
      }
   };

   return data.isVisible ? (
      <Container
         onWheel={data.project !== "none" ? handleScroll : null}
         className="glass shadow-div"
      >
         <CgClose
            className="icon corner close"
            size={28}
            onClick={() => handleShowProject("none", false)}
         />
         {data.project !== "none" ? (
            <>
               <TitleContainer>
                  <h1>{texts.title}</h1>
                  <div />
               </TitleContainer>
               <TextContainer>
                  <h2>{texts.name}</h2>
                  <p>{texts.description}</p>
                  <h2>{texts.tecnologies}</h2>
                  <div className="technologies">
                     <ReactDark />
                     <Expo />
                     <ReactNavigation />
                     <Firebase />
                     <GoogleMaps />
                  </div>
                  <h2>{texts.check}</h2>
                  <div className="platforms">
                     <div className="platform-div">
                        <a
                           href="https://play.google.com/store/apps/details?id=com.euquero.ufma.app"
                           target="_blank"
                        >
                           <AiFillAndroid className="icon android" size={36} />
                           <h3>Android</h3>
                        </a>
                     </div>
                     <div className="platform-div">
                        <a
                           href="https://apps.apple.com/br/app/euquero-app/id6448930823"
                           target="_blank"
                        >
                           <BsApple className="icon ios" size={36} />
                           <h3>iOS</h3>
                        </a>
                     </div>
                  </div>
               </TextContainer>
               <ImageContainer ref={imagesRef}>
                  <Image
                     src={"./projects/euquero/about.png"}
                     style={{
                        transform: "translate(-40%, -16%)",
                        opacity: "0%",
                     }}
                  />
                  <Image
                     src={"./projects/euquero/scorecards.png"}
                     style={{
                        transform: "translate(-30%, -12%)",
                        opacity: "0%",
                     }}
                  />
                  <Image
                     src={"./projects/euquero/map-preview.png"}
                     style={{
                        transform: "translate(-20%, -8%)",
                        opacity: "25%",
                     }}
                  />
                  <Image
                     src={"./projects/euquero/states.png"}
                     style={{
                        transform: "translate(-10%, -4%)",
                        opacity: "50%",
                     }}
                  />
                  <Image
                     src={"./projects/euquero/home.png"}
                     style={{ transform: "translate(0%,0%)", opacity: "100%" }}
                  />
               </ImageContainer>
               <div className="scroll-indicator">
                  <p>Scroll</p>
                  <BsArrowDown className="icon arrow-down" size={32} />
               </div>
            </>
         ) : (
            <div className="no-project">
               <h1>COMING SOON...</h1>
            </div>
         )}
      </Container>
   ) : null;
});
