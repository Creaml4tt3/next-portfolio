"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Reveal({
  children,
  before = { opacity: 0, y: 100 },
  after = { opacity: 1, y: 0 },
  // transition = { duration: 0.5, type: "spring", stiffness: 100, delay: 0.35 },
  transition = { duration: 0.5, delay: 0.35 },
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: "all" });
  const mainControl = useAnimation();

  const variants = {
    visible: { ...after, transition },
    hidden: before,
  };

  useEffect(() => {
    if (isInView === true) {
      mainControl.start("visible");
    }
  }, [isInView, mainControl]);

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={mainControl}
      transition={transition}
      className={`EnterComponent w-fit ${className}`}
    >
      {children}
    </motion.div>
  );
}
