"use client";
import dynamic from "next/dynamic";
import { motion, useScroll, useSpring } from "framer-motion";
import Title from "../components/Title";
export default function Web() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="flex-center w-full flex-col">
      Web
      <Title className="flex-center absolute bottom-[15vh] left-1/2 z-50 w-4/5 -translate-x-1/2 flex-col leading-none">
        <motion.div style={{ X: -Math.abs(scrollYProgress.current * 500) }}>
          Unleashing creativity with
        </motion.div>
        <motion.div style={{ x: Math.abs(scrollYProgress.current * 500) }}>
          Creaml4tt3 web development.
        </motion.div>
      </Title>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
      <div className="min-h-screen"></div>
    </div>
  );
}
