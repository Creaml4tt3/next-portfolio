import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

export default function WebTile({
  children,
  className,
  classContainer,
  ...props
}) {
  return (
    <Tilt
      gyroscope
      tiltReverse
      perspective={640}
      transitionSpeed={1000}
      className={"overflow-hidden " + className}
    >
      <motion.div
        drag
        dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
        dragConstraints={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        whileHover={{ cursor: "grab" }}
        className={
          "WebTile relative aspect-square w-full rounded-2xl bg-white " +
          classContainer
        }
        {...props}
      >
        {children}
      </motion.div>
    </Tilt>
  );
}
