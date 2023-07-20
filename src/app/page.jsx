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
import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import witchHouse from "../../public/lotties/witch_house.json";

import { getCards } from "./mutate/getCards";
import Loading from "./components/Loading";

const Reveal = dynamic(() => import("./components/Reveal"), {});
const Rive = dynamic(() => import("./components/Rive"), {
  loading: () => <Loading />,
});
const Card = dynamic(() => import("./components/Card"), {
  loading: () => <Loading />,
  ssr: false,
});
const Title = dynamic(() => import("./components/Title"), { ssr: true });
const Blob = dynamic(() => import("./components/Blob"));
const WebTile = dynamic(() => import("./components/WebTile"), {
  loading: () => <Loading />,
  ssr: false,
});
import { lexendPeta, mobo } from "./components/Fonts";

export default function Home() {
  const containerRef = useRef(null);
  const cardContainerRef = useRef(null);
  const witchHouseRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [hookedYPostion, setHookedYPosition] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHookedYPosition(latest);
  });
  const movingX = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const _movingX = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const movingY = useTransform(scrollYProgress, [0, 1], ["0%", "125vh"]);
  const _movingY = useTransform(scrollYProgress, [0, 1], ["0%", "-100vh"]);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards().then((cards) => setCards(JSON.parse(cards)));
  }, []);
  useEffect(() => {
    if (witchHouseRef.current) {
      witchHouseRef.current.pause();
    }
  }, [witchHouseRef]);
  useEffect(() => {
    if (witchHouseRef.current) {
      const windowHeight = window.innerHeight;
      const witchDuration = witchHouseRef.current.getDuration(true);
      const sumValue =
        (hookedYPostion * windowHeight * 1.5) /
          ((windowHeight * 1.25) / witchDuration) +
        19;

      witchHouseRef.current.goToAndStop(sumValue, true);
    }
  }, [hookedYPostion, witchHouseRef]);

  const cardInView = useInView(cardContainerRef, { amount: 0.3 });

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
    <div className="PageWrapper grid-pattern h-full min-h-screen overflow-x-hidden overflow-y-visible scroll-smooth">
      <section className="HeroSection flex h-screen w-screen items-center">
        <motion.div
          style={{ y: movingY }}
          className="HeroSectionContent relative mx-auto h-2/5 w-4/5"
        >
          <Image
            src={"/images/drawing-blue.svg"}
            alt="drawing"
            fill={true}
            className="HeroSectionContentImage !inset-[unset] !bottom-[15%]"
          />
          {/* <Image
            src={"/images/cat-website.png"}
            blurDataURL={"/images/cat-website.png"}
            placeholder="blur"
            alt="cat-website"
            width={1000}
            height={1000}
            className="HeroSectionContentImage aspect-square h-4/5 w-full object-cover"
          /> */}
          {/* <Image
            src={"/images/website.svg"}
            blurDataURL={"/images/website.svg"}
            placeholder="blur"
            alt="website"
            fill={true}
            className="HeroSectionContentImage"
          /> */}
        </motion.div>
        {/* <motion.div
          style={{ y: movingY }}
          className="WitchHouseContainer absolute h-full w-full"
        >
          <Lottie
            lottieRef={witchHouseRef}
            animationData={witchHouse}
            style={{ width: "75%", height: "auto" }}
            loop={false}
            className="WitchHouse pointer-events-none absolute bottom-0 left-0 right-0 mx-auto"
          />
        </motion.div> */}
        <Reveal>
          <Title
            font={mobo}
            className="flex-center text-stroke absolute bottom-[15dvh] left-1/2 z-50 w-4/5 -translate-x-1/2 flex-col leading-none"
          >
            <motion.div style={{ x: _movingX }} className="MovingTitle">
              {/* Unleashing creativity with */}
              創造性を解き放つ クリームラテ
            </motion.div>
            <motion.div style={{ x: movingX }} className="MovingTitle">
              {/* Creaml4tt3 web development. */}
              クリームラッテのウェブ開発。
            </motion.div>
          </Title>
        </Reveal>
        {/* <Canvas
          camera={{ position: [0.0, 0.0, 8.0] }}
          className="Canvas"
          style={{ width: "100vw", height: "100vh" }}
        >
          <Blob />
        </Canvas> */}
      </section>
      <section className="PageContain min-h-[25dvh]" />
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
