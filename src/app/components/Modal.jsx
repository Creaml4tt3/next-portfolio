"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ children }) {
  const [modalActive, setModalActive] = useState(false);
  const [count, setCount] = useState(5);
  const mainControl = useAnimation();
  const countIntervalRef = useRef(null);
  const countDown = () => {
    setCount((prevCount) => {
      if (prevCount <= 0) {
        clearInterval(countIntervalRef.current);
        mainControl.start({ opacity: 0 });
        setTimeout(() => {
          setModalActive(false);
        }, 350);
        return prevCount;
      }
      return prevCount - 1;
    });
  };

  useEffect(() => {
    setModalActive(process.env.NEXT_PUBLIC_WIP === "true");
    countIntervalRef.current = setInterval(countDown, 1000);
    return () => clearInterval(countIntervalRef.current);
  }, []);

  if (modalActive) {
    return (
      <motion.div
        initial={false}
        animate={mainControl}
        transition={{ duration: 0.5 }}
        className="Modal flex-center fixed left-0 top-0 z-[9998] h-screen w-screen bg-transparent backdrop-blur-xl"
      >
        <div className="ModalOverlay pointer-events-none absolute left-0 top-0 h-full w-full bg-bg opacity-30 blur-3xl" />
        <div className="ModalContentWrapper relative h-60 w-96 rounded-xl bg-grey_08 p-4">
          <button
            className="ModalCloseButton absolute right-6 top-6 text-white"
            onClick={() => {
              clearInterval(countIntervalRef.current);
              mainControl.start({ scale: 0, opacity: 0 });
              setTimeout(() => {
                setModalActive(false);
              }, 350);
            }}
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              style={{ color: "#ffffff" }}
            />
          </button>
          {children}
          <div className="ModalCount absolute bottom-6 left-1/2 -translate-x-1/2 text-white">
            closing in{" "}
            <span className="ModalSecond text-lg font-medium text-blue">
              {count}
            </span>
            s
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
