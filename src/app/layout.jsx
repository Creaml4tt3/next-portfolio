"use client";
import Head from "next/head";
import dynamic from "next/dynamic";

import "./globals.scss";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SessionProvider } from "next-auth/react";

import { usePathname } from "next/navigation";

const Nav = dynamic(() => import("./components/Nav"), { ssr: false });

export default function RootLayout({ children, session }) {
  const [pathname, setPathname] = useState(usePathname());
  const [navActive, setNavActive] = useState(pathname ? pathname : "/");

  const handleNav = (active) => {
    setNavActive(active);
  };

  const variants = {
    hidden: { opacity: 0, y: -100 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  };

  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <SessionProvider session={session}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              key={navActive}
              variants={variants}
              initial="hidden"
              animate="enter"
              exit="exit"
              transition={{
                //type: "spring",
                //stiffness: 100,
                duration: 0.5,
              }}
              className="MainWrapper overflow-x-hidden overflow-y-visible"
            >
              <Nav active={navActive} handleNav={handleNav} />
              {children}
            </motion.main>
          </AnimatePresence>
        </SessionProvider>
      </body>
    </html>
  );
}
