"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export default function EnterAnimation({
  children,
  before = { opacity: 0, y: 80 },
  after = { opacity: 1, y: 0 },
  transition = { duration: 0.5, delay: 0.25 },
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControl = useAnimation();

  useEffect(() => {
    console.log(isInView);
    if (isInView) {
      mainControl.start("visible");
    }
  }, [isInView]);

  console.log(before);
  console.log(after);
  console.log(transition);

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
      className={`EnterComponent ${className}`}
    >
      {children}
    </motion.div>
  );
}
