import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";
import { Metadata } from "next";
import Head from "next/head";

const montserrat = Montserrat({
   weight: ["300", "400", "500", "600", "700", "800"],
   style: ["normal", "italic"],
   subsets: ["latin"],
   display: "swap",
   variable: "--font-montserrat",
});

export const metadata: Metadata = {
   title: "Andrew Medeiros",
   description: "Bem vindo ao meu site portfolio!",
};

export default function App({ Component, pageProps }: AppProps) {
   return (
      <main className={montserrat.className}>
         <Head>
            <title>Andrew Medeiros</title>
            <link
               rel="shortcut icon"
               type="image/x-icon"
               href="./favicon.ico"
               sizes="any"
            />
         </Head>
         <Component {...pageProps} />
      </main>
   );
}
