"use client";
import dynamic from "next/dynamic";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";

const Nav = dynamic(() => import("@/app/components/Nav"));
const Modal = dynamic(() => import("@/app/components/Modal"), { ssr: true });

export default function AppWrapper({ children, session }) {
  const pathname = usePathname();

  const variants = {
    hidden: { opacity: 0, y: -100 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 100 },
  };
  return (
    <SessionProvider session={session}>
      <AnimatePresence mode="wait">
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
          className="MainWrapper grid-pattern z-10 overflow-x-hidden overflow-y-visible !scroll-smooth"
        >
          <Modal>
            <div className="ModalContent flex-center h-full">
              <span className="ModalText text-center text-xl font-medium text-white">
                กำลังดำเนินการ <br /> Currently Work In Progress
              </span>
            </div>
          </Modal>

          <Nav active={pathname ? pathname : "/"} />
          {children}
        </motion.main>
      </AnimatePresence>
    </SessionProvider>
  );
}
