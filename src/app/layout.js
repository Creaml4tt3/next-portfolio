"use client";
import Head from "next/head";
import dynamic from "next/dynamic";

import "./globals.scss";
import { useState } from "react";

const Nav = dynamic(() => import("./components/Nav"), { ssr: false });

export default function RootLayout({ children }) {
  const [navActive, setNavActive] = useState("");
  const handleNav = (active) => {
    setNavActive(active);
  };

  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Nav active={navActive} handleNav={handleNav} />
        {children}
      </body>
    </html>
  );
}
