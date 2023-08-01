import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
   BigContainer,
   Contact,
   Container,
   HighlightInput,
   HighlightTextArea,
   ImageContainer,
   SmallContainer,
   SubmitButton,
   Text,
} from "./styles";
import { CgClose } from "react-icons/cg";

export default React.forwardRef((props, ref) => {
   const form = useRef();
   const [showing, setShowing] = useState(false);
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
      setShowing(show);
      if (show) {
         ref.current.locales.remount = handleSetTexts;
         handleSetTexts();
      }
   };

   useEffect(() => {
      ref.current.others.setShowBiography = handleShowBiography;
   });

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

   return showing ? (
      <Container>
         <div style={{ display: "flex", flex: 0.75, justifyContent: "center" }}>
            <h1 style={{ textAlign: "center" }}>{texts.title}</h1>
         </div>
         <div id="header" style={{ display: "flex", flex: 2.25 }}>
            <div style={{ width: "100%", flexDirection: "row" }}>
               <div>
                  <ImageContainer>
                     <img
                        src="./me.jpeg"
                        style={{
                           height: "auto",
                           maxWidth: "100%",
                        }}
                     />
                  </ImageContainer>
               </div>
               <h2>{texts.subtitle}</h2>
               <p style={{ fontWeight: 200, fontSize: 23 }}>Andrew Medeiros</p>
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
                  display: "flex",
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
                  style={{ flex: 0.1, cursor: isLoading ? "auto" : "pointer" }}
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
         <CgClose
            className="icon-close"
            size={28}
            onClick={() => handleShowBiography(false)}
         />
      </Container>
   ) : null;
});
