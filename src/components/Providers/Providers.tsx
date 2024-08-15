import { ApolloProvider } from "@apollo/client";
import { cn } from "@lib/utils";
import client from "@root/apolloClient";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const skModernist = localFont({
  src: "../../../public/fonts/sk-modernist.otf",
  variable: "--font-sk-modernist",
});

const wildWorld = localFont({
  src: "../../../public/fonts/wild-world.otf",
  variable: "--font-wild-world",
});

function Providers({ children }: { children: React.ReactNode }) {
  const fontProvider = `${spaceGrotesk.variable} ${skModernist.variable} ${wildWorld.variable}`;

  return (
    <ApolloProvider client={client}>
      <div className={cn(fontProvider)}>{children}</div>
    </ApolloProvider>
  );
}

export default Providers;
