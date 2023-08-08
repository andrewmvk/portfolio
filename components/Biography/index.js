import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
   BigContainer,
   Contact,
   Container,
   HighlightInput,
   HighlightTextArea,
   ImageContainer,
   OuterContainer,
   SmallContainer,
   SubmitButton,
   Text,
} from "./styles";
import Button from "../Button";

export default React.forwardRef((props, ref) => {
   const container = useRef();
   const form = useRef();
   const [isLoading, setIsLoading] = useState(false);
   const [texts, setTexts] = useState({
      title: "",
      subtitle: "",
      description: "",
      past: "",
      pastDescription: "",
      present: "",
      presentDescription: "",
      future: "",
      futureDescription: "",
      contact: "",
      nameLabel: "",
      emailLabel: "",
      messageLabel: "",
      send: "",
   });

   const handleSetTexts = () => {
      const locale = ref.current.locales.data[ref.current.locales.selected];
      setTexts({ ...locale.biography });
   };

   const handleShowBiography = (show = false) => {
      if (show) {
         ref.current.locales.remount = handleSetTexts;
         handleSetTexts();
      } else {
         handleButtonClick({ target: { checked: false } }, true);
         ref.current.cameraSettings.GUI.showing = false;
      }
   };

   useEffect(() => {
      ref.current.others.setShowBiography = handleShowBiography;
   });

   const handleButtonClick = (e, closeIcon = false) => {
      ref.current.locales.remount = handleSetTexts;
      handleSetTexts();

      let opacity = "opacity: 0";
      let translate = "translate(-50%, 50%)";

      if (e.target.checked && !closeIcon) {
         ref.current.others.setIllusion();
         opacity = "opacity: 1";
         translate = "translate(-50%, -50%)";
      } else if (!e.target.checked && !closeIcon) {
         ref.current.others.onIllusionClose();
      }

      container.current.style = opacity;
      container.current.style.transform = translate;
   };

   const sendEmail = e => {
      e.preventDefault();
      setIsLoading(true);

      emailjs
         .sendForm(
            "service_6kw371s",
            "template_w7hxhg7",
            form.current,
            "V3xclgDWIqfY61ttB"
         )
         .then(
            result => {
               e.target.reset();
               console.log(result.text);
            },
            error => {
               console.log(error.text);
            }
         )
         .finally(() => {
            setIsLoading(false);
         });
   };

   return (
      <OuterContainer>
         <Container ref={container} className="glass shadow-div">
            <div className="scroll-div">
               <div
                  style={{
                     display: "flex",
                     flex: 0.75,
                     justifyContent: "center",
                  }}
               >
                  <h1 style={{ textAlign: "center" }}>{texts.title}</h1>
               </div>
               <div id="header" style={{ display: "flex", flex: 2.25 }}>
                  <div style={{ width: "100%", flexDirection: "row" }}>
                     <div>
                        <ImageContainer>
                           <img src="./me.jpeg" />
                        </ImageContainer>
                     </div>
                     <h2>{texts.subtitle}</h2>
                     <p style={{ fontWeight: 200, fontSize: 23 }}>
                        Andrew Medeiros
                     </p>
                     <p>{texts.description}</p>
                  </div>
               </div>
               <BigContainer>
                  <SmallContainer>
                     <h2>{texts.past}</h2>
                     <Text>{texts.pastDescription}</Text>
                  </SmallContainer>
                  <SmallContainer>
                     <h2>{texts.present}</h2>
                     <Text>{texts.presentDescription}</Text>
                  </SmallContainer>
                  <SmallContainer>
                     <h2>{texts.future}</h2>
                     <Text>{texts.futureDescription}</Text>
                  </SmallContainer>
               </BigContainer>
               <Contact ref={form} onSubmit={sendEmail}>
                  <div style={{ flex: 1.5 }}>
                     <h1>{texts.contact}</h1>
                  </div>
                  <div
                     style={{
                        flex: 2,
                        minHeight: 45,
                        display: "flex",
                        marginBottom: 20,
                        width: "100%",
                        justifyContent: "space-between",
                     }}
                  >
                     <HighlightInput
                        style={{ flex: 0.3 }}
                        type="text"
                        name="user_name"
                        maxLength={200}
                        required
                        placeholder={texts.nameLabel}
                     />
                     <HighlightInput
                        style={{ flex: 0.5 }}
                        type="email"
                        name="user_email"
                        maxLength={200}
                        required
                        placeholder={texts.emailLabel}
                     />
                     <SubmitButton
                        type="submit"
                        style={{
                           flex: 0.1,
                           cursor: isLoading ? "auto" : "pointer",
                        }}
                     >
                        {isLoading ? (
                           <div className="loading-icon" />
                        ) : (
                           <p>{texts.send}</p>
                        )}
                     </SubmitButton>
                  </div>
                  <HighlightTextArea
                     style={{ flex: 5 }}
                     maxLength={1000}
                     type="text"
                     name="message"
                     required
                     placeholder={texts.messageLabel}
                  />
               </Contact>
               <div className="close">
                  <input
                     type="checkbox"
                     id="icon-close"
                     onChange={e => handleButtonClick(e, true)}
                  />
                  <label htmlFor="icon-close">
                     <div className="bar" />
                     <div className="bar" />
                  </label>
               </div>
            </div>
         </Container>
         <Button text="ILLUSION" onClick={handleButtonClick} />
      </OuterContainer>
   );
});
