"use client";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useState, useEffect } from "react";

const Reveal = dynamic(() => import("./components/Reveal"));
const Rive = dynamic(() => import("./components/Rive"), { ssr: false });
const Card = dynamic(() => import("./components/Card"), { ssr: false });

export default function Home() {
  const [cards, setCards] = useState([]);
  async function getCards() {
    try {
      let response = await fetch("/api/cards");
      let cards = await response.json();
      return cards;
    } catch (error) {
      console.error(e);
    }
  }
  useEffect(() => {
    getCards().then((cards) => setCards(cards));
  }, []);
  return (
    <main className="MainWrapper overflow-x-hidden">
      <Reveal>
        <section className="CardCollection flex items-start justify-center">
          {cards?.length > 0 ? (
            cards.map((card, index) => {
              return (
                <Card
                  key={card?._id}
                  id={card?._id}
                  image={card?.image ? `/images/${card.image}` : ""}
                  alt={card?.alt}
                  name={card?.name}
                  des={card?.des}
                  level={card?.level}
                  count={card?.count}
                />
              );
            })
          ) : (
            <span className="CardUndefined w-full text-center text-base font-normal">
              ไม่ค้นพบข้อมูล
            </span>
          )}
        </section>
      </Reveal>
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
    </main>
  );
}
