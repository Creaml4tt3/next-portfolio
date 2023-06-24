"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useInView,
} from "framer-motion";
import { Canvas } from "@react-three/fiber";
import Tilt from "react-parallax-tilt";
import { useState, useEffect, useRef } from "react";

import { getCards } from "./mutate/getCards";

const Reveal = dynamic(() => import("./components/Reveal"));
const Rive = dynamic(() => import("./components/Rive"));
const Card = dynamic(() => import("./components/Card"));
const Title = dynamic(() => import("./components/Title"));
const Blob = dynamic(() => import("./components/Blob"));
const WebTile = dynamic(() => import("./components/WebTile"));

export default function Home() {
  const containerRef = useRef(null);
  const cardContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [hookedYPostion, setHookedYPosition] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHookedYPosition(latest);
  });
  const movingX = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const _movingX = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const _movingY = useTransform(scrollYProgress, [0, 1], ["0%", "-50vh"]);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards().then((cards) => setCards(JSON.parse(cards)));
  }, []);

  const cardInView = useInView(cardContainerRef, { amount: 0.5 });

  const webTiles = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
    {
      id: 8,
    },
  ];

  return (
    <div className="PageWrapper h-full min-h-screen overflow-x-hidden overflow-y-visible">
      <section className="HeroSection h-screen w-screen bg-black">
        <Reveal>
          <Title className="flex-center absolute bottom-[15dvh] left-1/2 z-50 w-4/5 -translate-x-1/2 flex-col leading-none">
            <motion.div style={{ x: _movingX }} className="MovingTitle">
              Unleashing creativity with
            </motion.div>
            <motion.div style={{ x: movingX }} className="MovingTitle">
              Creaml4tt3 web development.
            </motion.div>
          </Title>
        </Reveal>
        <Reveal>
          <Canvas
            camera={{ position: [0.0, 0.0, 8.0] }}
            className="Canvas"
            style={{ width: "100vw", height: "100vh" }}
          >
            <Blob />
          </Canvas>
        </Reveal>
      </section>
      <section className="PageContain min-h-[25dvh]"></section>
      <motion.section className="WebShowCase p-24" style={{ y: _movingY }}>
        <div className="WebTileContainer grid grid-cols-4 gap-5">
          {webTiles &&
            webTiles.map((webTile) => {
              return <WebTile key={webTile.id}></WebTile>;
            })}
        </div>
      </motion.section>
      <motion.section
        className="CardCollection mx-auto flex flex-wrap justify-center gap-8 px-desktop pb-[20vh]"
        ref={cardContainerRef}
      >
        {cards &&
          cards.length > 0 &&
          cards.map((card, index) => {
            return (
              <motion.div
                key={card.id}
                drag
                dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
                dragConstraints={{
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
                whileHover={{ cursor: "grab" }}
                initial={{ y: 0 }}
                animate={{
                  y: -Math.abs(cardInView ? 0 : 30 * index),
                  rotateZ: Math.abs(cardInView ? 0 : -15),
                }}
                transition={{
                  type: "spring",
                  stiffness: 30 * (index + 1),
                  duration: 0.25 * index,
                }}
              >
                <Card
                  key={card?._id}
                  id={card?._id}
                  image={card?.image}
                  alt={card?.alt}
                  name={card?.name}
                  des={card?.des}
                  level={card?.level}
                  count={card?.count}
                />
              </motion.div>
            );
          })}
      </motion.section>
      {/* <Reveal>
        <Rive />
      </Reveal> */}
    </div>
  );
}
