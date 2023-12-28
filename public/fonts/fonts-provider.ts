import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

/* Local font sample */
// export const sampleLocalFont =  localFont({ src: "./local-font.otf" });
