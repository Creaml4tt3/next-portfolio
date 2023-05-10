import Image from "next/image";

import Rive from "./components/Rive";
import EnterAnimation from "./components/EnterAnimation";

export default function Home() {
  return (
    <main className="MainWrapper overflow-x-hidden">
      <EnterAnimation
        before={{ scale: 0, opacity: 0 }}
        after={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.5,
          stiffness: 90,
        }}
      >
        <Rive />
      </EnterAnimation>
    </main>
  );
}
