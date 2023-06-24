import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

export default function WebTile({ children, ...props }) {
  return (
    <Tilt gyroscope tiltReverse perspective={640} transitionSpeed={1000}>
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
        className="WebTile aspect-square w-full rounded-[40px] bg-blue"
        {...props}
      >
        {children}
      </motion.div>
    </Tilt>
  );
}
