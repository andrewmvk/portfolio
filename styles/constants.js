import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
   weight: ["300", "400", "500", "600", "700", "800"],
   style: ["normal", "italic"],
   subsets: ["latin"],
   display: "swap",
});

export const colors = {
   text: "#fafafa",
   highlight: "#fad041",
   background: "#101010",
   glassBg: "rgba(0,0,0,0.15)",
   glassBorder: "rgba(255,255,255,0.25)",
};

export const fontSize = {
   headerTitle: 23,
   headerSubTitle: 15,
   title: 28,
   subTitle: 25,
   text: 18,
   button: 21,
};

export const others = {
   blur: 3,
   fontFamily: montserrat,
};

export const letters = [
   "\u0391",
   "\u0392",
   "\u0393",
   "\u0394",
   "\u0395",
   "\u0396",
   "\u0397",
   "\u0398",
   "\u0399",
   "\u039A",
   "\u039B",
   "\u039C",
   "\u039D",
   "\u039E",
   "\u039F",
   "\u03A0",
   "\u03A1",
   "\u03A3",
   "\u03A4",
   "\u03A5",
   "\u03A6",
   "\u03A7",
   "\u03A8",
   "\u03A9",
];
