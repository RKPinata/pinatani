import Head from "next/head";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Pinatani</title>
        <meta name="description" content="Pinatani" />        
        {/* Other meta tags */}
      </Head>
      <div className="relative flex flex-col min-h-screen antialiased font-sans">
        {/* TODO: nav */}
        {/* <Navbar /> */}
        <main className="relative flex flex-col flex-grow text-foreground">
          {children}
        </main>
        {/** TODO: footer */}
        <footer></footer>
      </div>
    </>
  );
}

export default Layout;
