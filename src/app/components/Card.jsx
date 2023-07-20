"use client";
import Image from "next/image";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import ImagePlaceholder from "@public/lotties/image_placeholder.json";
import { useState, useEffect, useRef } from "react";

export default function Card({
  children,
  className,
  image,
  alt = "Card Image",
  level = 3,
  count = 5,
  name,
  des,
}) {
  const [cardLevel, setCardLevel] = useState([]);
  const cardRef = useRef(null);

  useEffect(() => {
    if (level && count) {
      let arr = [];
      for (let i = 0; i < count; i++) {
        if (i < level) {
          arr.push(1);
        } else {
          arr.push(0);
        }
      }
      setCardLevel(arr);
    }
  }, []);

  return (
    <Tilt
      ref={cardRef}
      gyroscope
      tiltReverse
      glareEnable
      glareReverse
      glareColor="#5299f0"
      glarePosition="all"
      glareMaxOpacity={0.3}
      glareBorderRadius="16px"
      perspective={640}
      transitionSpeed={1000}
      className={
        "Card flex-center group relative m-0 h-fit w-fit flex-col rounded-2xl border-2 border-black bg-white px-4 py-4 backdrop-blur backdrop-brightness-125" +
        className
      }
    >
      <div className="CardImage flex-center relative h-96 w-64 overflow-hidden rounded-xl border-2 border-black bg-black backdrop-blur">
        {image ? (
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(min-width: 320px) 1024px"
            loading="lazy"
            placeholder="blur"
            blurDataURL={image}
            className="CardImageImg object-cover"
          />
        ) : (
          <Lottie
            animationData={ImagePlaceholder}
            style={{ width: 254, height: 392 }}
            className="LottieImageHolder absolute left-0 top-0"
          />
        )}
        <div className="CardLevel absolute right-4 top-1 my-3 flex w-full flex-row-reverse justify-start gap-2">
          {cardLevel &&
            cardLevel.map((currentLevel, index) => {
              return (
                <div
                  key={index}
                  className={`CardPerLevel h-3 w-3 rounded-full border border-solid ${
                    currentLevel === 1
                      ? "CardPerLevelActive bg-blue"
                      : "bg-transparent"
                  }`}
                />
              );
            })}
        </div>
        <div className="CardDetailLayer absolute left-0 top-0 h-full w-full bg-grey_08 opacity-0 blur-3xl transition-all duration-300 group-hover:opacity-100" />
        <motion.div className="CardDetail pointer-events-none absolute flex flex-col items-start justify-start px-4 opacity-0 transition-all duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
          <div className="CardName flex-center w-full">
            <span className="CardNameText text-center text-base uppercase text-white">
              {name ? name : "ไม่พบชื่อ"}
            </span>
          </div>
          <hr className="LineBreak my-2 w-full bg-white" />
          <div className="CardDescription">
            <p className="CardNameText text-center text-xs font-normal text-white">
              {des ? des : "ไม่พบคำอธิบาย"}
            </p>
          </div>
        </motion.div>
        {children}
      </div>
    </Tilt>
  );
}
