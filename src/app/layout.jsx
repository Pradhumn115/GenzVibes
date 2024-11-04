import { Inter } from "next/font/google";
import "./globals.css";

import GoogleAnalytics from "./Components/GoogleAnalytics";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GenzVibes",
  description: "AI-powered platform for finding free movie links, book downloads, and YouTube video and playlist downloads. Seamlessly search and download content with intelligent recommendations and a user-friendly interface.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>  
        <GoogleAnalytics/>
        {/* <meta name="monetag" content="3f1b48cde3715fa48dc297c537afffd0"/> */}
      </head>
      {/* <Script type='text/javascript' src='//lockupaccede.com/13/55/72/135572f0313c7e73e2351b735aefa79f.js' strategy='lazyOnload'></Script> */}
      <body className={`${inter.className}`}>
        {children}
      </body>
      {/* <Script strategy='lazyOnload' type='text/javascript' src='//pl24338845.cpmrevenuegate.com/f1/83/0c/f1830ccd02e4b6a21648d30ff46abb0a.js'></Script> */}
    </html>
    
  );
}
