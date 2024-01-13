import Head from "next/head";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Pinatani</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Pinatani" />
        {/* Other meta tags */}
      </Head>
      {/* TODO: Remove default dark mode class */}
      <div className="relative flex flex-col min-h-screen antialiased font-sans dark bg-background">
        {/* TODO: nav */}
        {/* <Navbar /> */}
        <main className="relative flex flex-col flex-grow text-foreground">{children}</main>
        {/** TODO: footer */}
        <footer></footer>
      </div>
    </>
  );
}

export default Layout;
