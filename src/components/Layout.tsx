import { cn } from "@/lib/utils";
import Head from "next/head";
import React from "react";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Pinatani</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Pinatani" />
        {/* Other meta tags */}
      </Head>
      <body className="relative min-h-screen antialiased font-sans">

        {/* TODO: nav */}
        <header></header>
        <main className="relative flex flex-col">{children}</main>

        {/** TODO: footer */}
        <footer></footer>
      </body>
    </>
  );
}

export default RootLayout;
