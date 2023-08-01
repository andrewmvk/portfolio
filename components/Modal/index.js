import React, { useEffect, useState } from "react";
import {
   ButtonContainer,
   Container,
   LevelCountContainer,
   LevelCountPart,
   Line,
   TextContainer,
} from "./styles";
import ModalButton from "../ModalButton";
import { Vector3 } from "three";

const resetedPositon = new Vector3(0, 0, 0);

export default React.forwardRef((props, ref) => {
   const [isVisible, setIsVisible] = useState(false);
   const [texts, setTexts] = useState({
      name: "",
      developTime: "",
      knowledgeLevel: "",
      experience: "",
      description: "",
      level: "",
      time: "",
      button: "",
   });

   const handleLangChange = () => {
      const selected = ref.current.tools.selected;
      const locale = ref.current.locales.data[ref.current.locales.selected];
      if (!isNaN(selected)) {
         setTexts({ ...locale.technologies[selected], ...locale.modal });
      }
   };

   const handleSetModal = () => {
      const selected = ref.current.tools.selected;
      const locale = ref.current.locales.data[ref.current.locales.selected];
      if (!isNaN(selected)) {
         setIsVisible(true);
         setTexts({ ...locale.technologies[selected], ...locale.modal });
      }
      ref.current.locales.remount = handleLangChange;
   };

   const handleExitPress = () => {
      ref.current.tools.selected = null;
      // Resets the camera so that it goes back to its original "looking position"
      ref.current.cameraSettings.lookingAt = resetedPositon;
      setIsVisible(false);
      // Function setted in "PlanetsScreen", called here to reset some camera settings
      ref.current.others.onModalClose();
   };

   useEffect(() => {
      ref.current.others.setModal = handleSetModal;
   }, []);

   return isVisible ? (
      <Container>
         <div style={{ display: "flex", width: "100%", flex: 1.5 }}>
            <div
               style={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
               }}
            >
               <h1>{texts.name}</h1>
               <h3>{texts.time + texts.developTime}</h3>
               <h3>{texts.level + texts.knowledgeLevel}</h3>
            </div>
            <LevelCountContainer>
               <LevelCountPart
                  style={{
                     borderTopRightRadius: 0,
                     borderBottomRightRadius: 0,
                  }}
               />
               <LevelCountPart style={{ borderRadius: 0 }} />
               <LevelCountPart
                  style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
               />
            </LevelCountContainer>
         </div>
         <div style={{ display: "flex", flex: 1 }}>
            <Line style={{ marginTop: 15 }} />
         </div>
         <TextContainer>
            <div style={{ height: "100%" }}>
               <h2 style={{ marginBottom: 10 }}>{texts.experience}</h2>
               <p>{texts.description}</p>
            </div>
         </TextContainer>
         <ButtonContainer>
            <ModalButton text={texts.button} onPress={handleExitPress} />
         </ButtonContainer>
      </Container>
   ) : null;
});
