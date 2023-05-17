"use client";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import "./globals.scss";
import { useState } from "react";

import { SessionProvider } from "next-auth/react";

const Nav = dynamic(() => import("./components/Nav"), { ssr: false });

export default function RootLayout({ children, session }) {
  const [navActive, setNavActive] = useState("");

  const router = useRouter();

  const handleNav = (active) => {
    setNavActive(active);
  };
  const handleNavClick = (url) => {
    router.replace(url);
  };

  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <SessionProvider session={session}>
          <Nav
            active={navActive}
            handleNav={handleNav}
            handleClick={handleNavClick}
          />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
