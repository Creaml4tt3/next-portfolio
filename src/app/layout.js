"use client";
import "./globals.scss";
import { useState } from "react";

import Nav from "./components/Nav";

export const metadata = {
  title: "Creaml4tt3 NextJS",
  description: "Made with Love serve me Luck",
};

export default function RootLayout({ children }) {
  const [navActive, setNavActive] = useState("");
  const handleNav = (active) => {
    setNavActive(active);
  };

  return (
    <html lang="en">
      <body className="">
        <Nav active={navActive} handleNav={handleNav} />
        {children}
      </body>
    </html>
  );
}
