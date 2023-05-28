"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import { useState, useEffect } from "react";

import { getCards } from "./mutate/getCards";

const Reveal = dynamic(() => import("./components/Reveal"));
const Rive = dynamic(() => import("./components/Rive"), { ssr: false });
const Card = dynamic(() => import("./components/Card"), { ssr: false });
const Blob = dynamic(() => import("./components/Blob"), { ssr: false });

export default function Home() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getCards().then((cards) => setCards(JSON.parse(cards)));
  }, []);
  return (
    <div className="PageWrapper h-full min-h-screen overflow-x-hidden overflow-y-visible">
      <section className="CardCollection flex-center mx-auto flex-wrap overflow-visible">
        {cards &&
          cards.length > 0 &&
          cards.map((card, index) => {
            return (
              <Reveal key={index} className="mx-auto overflow-visible">
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
      </section>
      <Reveal>
        <Rive />
      </Reveal>
    </div>
  );
}
