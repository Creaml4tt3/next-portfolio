"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function Reveal({
  children,
  before = { opacity: 0, y: -100 },
  after = { opacity: 1, y: 0 },
  transition = { duration: 0.5, type: "spring", stiffness: 100, delay: 0.35 },
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: before,
        visible: after,
      }}
      initial="hidden"
      animate={mainControl}
      transition={transition}
      className={`EnterComponent w-fit ${className}`}
    >
      {children}
    </motion.div>
  );
}
