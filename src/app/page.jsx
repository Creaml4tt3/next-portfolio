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
import { readWebs } from "./mutate/Webs";
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
  const { scrollYProgress } = useScroll();
  const [hookedYPostion, setHookedYPosition] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setHookedYPosition(latest);
  });
  const movingX = useTransform(scrollYProgress, [0, 1], ["0vw", "100vw"]);
  const _movingX = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
  const movingY = useTransform(scrollYProgress, [0, 1], ["0%", "125vh"]);
  const _movingY = useTransform(scrollYProgress, [0, 1], ["0%", "-100vh"]);
  const circleUp = useTransform(scrollYProgress, [0, 0.55], ["0%", "200%"]);
  const scaleUp = useTransform(scrollYProgress, [0, 1], [1, 3]);

  const [cards, setCards] = useState([]);
  const [webs, setWebs] = useState([]);
  useEffect(() => {
    getCards().then((cards) => setCards(JSON.parse(cards)));
    readWebs().then((webs) => setWebs(JSON.parse(webs)));
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
        (hookedYPostion * windowHeight * 1.25) /
          ((windowHeight * 1.25) / witchDuration) +
        19.2;

      witchHouseRef.current.goToAndStop(sumValue, true);
    }
  }, [hookedYPostion, witchHouseRef]);

  const cardInView = useInView(cardContainerRef, { amount: 0.25 });

  // const webTiles = [
  //   {
  //     id: 1,
  //   },
  //   {
  //     id: 2,
  //   },
  //   {
  //     id: 3,
  //   },
  //   {
  //     id: 4,
  //   },
  //   {
  //     id: 5,
  //   },
  //   {
  //     id: 6,
  //   },
  //   {
  //     id: 7,
  //   },
  //   {
  //     id: 8,
  //   },
  // ];

  return (
    <div className="PageWrapper h-full min-h-screen overflow-x-hidden overflow-y-visible scroll-smooth">
      <section className="HeroSection relative block h-fit min-h-screen w-screen">
        <motion.div
          style={{ y: movingY }}
          className="HeroSectionContent relative mx-auto h-2/5 w-4/5"
        >
          {/* <Image
            src={"/images/drawing-blue.svg"}
            alt="drawing"
            fill={true}
            className="HeroSectionContentImage !inset-[unset] !bottom-[15%]"
          /> */}
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

        <motion.div
          style={{ y: movingY }}
          className="WitchHouseContainer pointer-events-none absolute z-0 h-full w-full opacity-30 mix-blend-multiply grayscale"
        >
          <Lottie
            lottieRef={witchHouseRef}
            animationData={witchHouse}
            style={{ width: "75%", height: "auto" }}
            loop={false}
            className="WitchHouse pointer-events-none absolute bottom-0 left-0 right-0 mx-auto"
          />
        </motion.div>
        {/* <Reveal> */}
        {/* <Rive className="float-right h-[100dvh] w-[100dvw]" /> */}
        {/* </Reveal> */}
        <Reveal>
          <motion.div
            style={{ x: movingX }}
            className={
              "TitleEng absolute bottom-[35dvh] left-[5dvw] text-3xl font-light text-white"
            }
          >
            Unleashing creativity with <br />
            <span className="text-blue">Creaml4tt3</span> web development.
          </motion.div>
        </Reveal>

        <Reveal>
          <Title
            font={mobo}
            className="flex-center text-stroke absolute bottom-[15dvh] left-[5dvw] z-50 w-4/5 flex-col leading-none"
          >
            <motion.div
              style={{ x: movingX }}
              className="MovingTitle w-full text-start"
            >
              創造性を解き放つ クリームラテ
            </motion.div>
            <motion.div
              style={{ x: movingX }}
              className="MovingTitle flex w-full items-end text-start"
            >
              <motion.div
                // style={{ scale: scaleUp }}
                className="text-[min(18vw,96px)] text-blue"
              >
                クリームラッテ
              </motion.div>
              <span>のウェブ開発。</span>
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
          {webs &&
            webs.map((webTile, index) => {
              return (
                <Reveal key={webTile.id}>
                  <a href={webTile?.link}>
                    <WebTile
                      // style={{
                      //   clipPath: `circle(${circleUp.current} at 0% ${
                      //     (index % 5) * 25
                      //   }%)`,
                      // }}
                      className="group rounded-2xl border-4 border-jp_black"
                      classContainer="flex justify-start items-start flex-col p-6 transtion-all !bg-transparent"
                    >
                      <Image
                        src={webTile?.image}
                        blurDataURL={webTile?.image}
                        placeholder="blur"
                        alt={webTile?.alt}
                        sizes="(max-width: 1920px) 25vw"
                        fill={true}
                        className="Image absolute -z-10 object-cover transition-all duration-300 group-hover:blur-sm group-hover:grayscale"
                      />
                      <div className="WebTileDetail pointer-events-none flex flex-col items-start justify-start gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        <span className="WebTileTitle rounded-lg bg-blue p-2 text-lg font-medium text-white">
                          {webTile?.name}
                        </span>
                        <p className="WebTileDes rounded-lg bg-white p-2 text-xs font-light text-black">
                          {webTile?.des}
                        </p>
                        <ul className="WebTileStacks absolute bottom-6 left-6 flex flex-wrap-reverse gap-2">
                          {webTile?.stack.map((sta) => {
                            return (
                              <li
                                key={sta}
                                className="WebTileStack rounded-lg bg-jp_black p-2 text-white"
                              >
                                {sta}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </WebTile>
                  </a>
                </Reveal>
              );
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
              <Reveal key={card.id}>
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
              </Reveal>
            );
          })}
      </motion.section>
    </div>
  );
}
