"use client";
import Lottie from "lottie-react";
import { motion } from "framer-motion";

import catLoading from "../../../public/lotties/cat_loading.json";

export default function Loading() {
  return (
    <div className="LoadingComponent flex-center h-full w-full">
      {/* <motion.div
        className="Loading h-12 w-12 rounded-full"
        style={{
          border: "5px solid #ffffff",
          borderTop: "5px solid #5299f0",
        }}
        initial={{ rotateZ: "360deg" }}
        animate={{
          rotateZ: "360deg",
        }}
        transition={{
          delay: 2,
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 2,
        }}
      ></motion.div> */}
      {/* <Lottie
        animationData={catLoading}
        style={{ width: "auto" }}
        className="CatLoading"
      /> */}
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
