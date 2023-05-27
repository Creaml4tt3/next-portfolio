"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";

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
              </Reveal>
            );
          })}
      </section>
      <Reveal
        before={{ scale: 0, opacity: 0 }}
        after={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.5,
          stiffness: 90,
        }}
      >
        <Rive />
      </Reveal>
    </div>
  );
}
