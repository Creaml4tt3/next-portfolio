"use client";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ children, handleModal }) {
  const [isOpen, setIsOpen] = useState(true);
  const [count, setCount] = useState(5);
  const mainControl = useAnimation();
  const countDown = () => {
    setCount(count - 1);
  };
  useEffect(() => {
    if (count === 0) {
      clearInterval(countInterval);
      mainControl.start({ scale: 0, opacity: 0 });
      setTimeout(() => {
        setIsOpen(false);
        handleModal(false);
      }, 350);
    }
  }, [count]);
  const countInterval = setInterval(countDown, 1000);

  if (isOpen) {
    return (
      <motion.div
        initial={false}
        animate={mainControl}
        transition={{ duration: 0.3 }}
        className="Modal flex-center fixed left-0 top-0 z-50 h-screen w-screen bg-grey_08"
      >
        <div className="ModalOverlay pointer-events-none absolute left-0 top-0 h-full w-full bg-bg opacity-30 blur-3xl" />
        <div className="ModalContentWrapper relative h-60 w-96 rounded-xl bg-grey_08 p-4">
          <button
            className="ModalCloseButton absolute right-6 top-6 text-white"
            onClick={() => {
              clearInterval(countInterval);
              mainControl.start({ scale: 0, opacity: 0 });
              setTimeout(() => {
                setIsOpen(false);
                handleModal(false);
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
}
