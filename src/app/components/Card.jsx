"use client";
import Image from "next/image";
import Lottie from "lottie-react";
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
      gyroscope
      tiltReverse
      glareEnable
      glareColor="#5529f0"
      glarePosition="all"
      glareMaxOpacity={0.3}
      className="CardTilt h-fit w-fit overflow-visible"
    >
      <div
        ref={cardRef}
        className={
          "Card flex-center bg-grey08 preserv m-0 h-fit w-fit flex-col overflow-visible rounded-xl border-2 border-solid border-white bg-grey_08 px-4 pb-8 pt-4 backdrop-blur backdrop-brightness-125 " +
          className
        }
      >
        <div className="CardImage relative h-60 w-72 overflow-hidden rounded-2xl border border-solid border-white bg-grey_08 backdrop-blur">
          {image ? (
            <Image
              src={image}
              alt={alt}
              fill
              sizes="(min-width: 320px) 280px"
              loading="lazy"
              placeholder="blur"
              blurDataURL={image}
              className="CardImageImg object-cover"
            />
          ) : (
            <Lottie
              animationData={ImagePlaceholder}
              style={{ width: 280, height: 240 }}
              className="LottieImageHolder absolute left-0 top-0"
            />
          )}
        </div>
        <div className="CardLevel my-3 flex w-full flex-row-reverse justify-start gap-2">
          {cardLevel &&
            cardLevel.map((currentLevel, index) => {
              return (
                <div
                  key={index}
                  className={`CardPerLevel h-3 w-3 rounded-full border border-solid ${
                    currentLevel === 1
                      ? "CardPerLevelActive bg-blue"
                      : "bg-grey"
                  }`}
                />
              );
            })}
        </div>
        <div className="CardDetail flex w-72 flex-col items-start justify-start">
          <div className="CardName flex-center w-full">
            <span className="CardNameText text-center text-base uppercase text-white">
              {name ? name : "ไม่พบชื่อ"}
            </span>
          </div>
          <hr className="LineBreak my-2 w-full bg-white" />
          <div className="CardDescription">
            <p className="CardNameText text-justify text-xs font-normal text-white">
              {des ? des : "ไม่พบคำอธิบาย"}
            </p>
          </div>
        </div>
        {children}
        <hr className="LineBreak mt-3 w-full bg-white" />
      </div>
    </Tilt>
  );
}
