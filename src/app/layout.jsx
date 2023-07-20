"use client";
import localFont from "next/font/local";
import dynamic from "next/dynamic";

import "./globals.scss";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SessionProvider } from "next-auth/react";

import { usePathname } from "next/navigation";

const Nav = dynamic(() => import("./components/Nav"));
const Modal = dynamic(() => import("./components/Modal"));

const monoFont = localFont({
  src: "../../public/fonts/Font.ttf",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Creaml4tt3",
  description: "Creaml4tt3 Personal Portfolio",
  openGraph: {
    title: "Creaml4tt3",
    description: "Creaml4tt3 Personal Portfolio",
  },
};

export default function RootLayout({ children, session }) {
  const pathname = usePathname();
  const [navActive, setNavActive] = useState(pathname ? pathname : "/");
  const [modalActive, setModalActive] = useState(
    process.env.WIP ? process.env.WIP : false
  );

  const handleModal = (active) => {
    setModalActive(active);
  };

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
      <body className={`overflow-x-hidden bg-bg ${monoFont.className}`}>
        <SessionProvider session={session}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.main
              key={pathname}
              variants={variants}
              initial="hidden"
              animate="enter"
              transition={{
                type: "spring",
                stiffness: 100,
                duration: 0.5,
              }}
              className="MainWrapper overflow-x-hidden overflow-y-visible"
            >
              {modalActive && (
                <Modal handleModal={handleModal}>
                  <div className="ModalContent flex-center h-full">
                    <span className="ModalText text-center text-xl font-medium text-white">
                      กำลังดำเนินการ <br /> Currently Work In Progress
                    </span>
                  </div>
                </Modal>
              )}
              <Nav active={navActive} handleNav={handleNav} />
              {children}
            </motion.main>
          </AnimatePresence>
        </SessionProvider>
      </body>
    </html>
  );
}
