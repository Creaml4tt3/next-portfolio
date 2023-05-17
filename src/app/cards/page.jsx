"use client";
import { useState, useEffect } from "react";
import Reveal from "../components/Reveal";

import { useSession } from "next-auth/react";

import CardList from "../components/CardList";

export default function Cards() {
  const { data: session } = useSession({
    required: true,
  });

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [des, setDes] = useState("");
  const [level, setLevel] = useState(3);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const [cards, setCards] = useState([]);

  async function getCards() {
    try {
      let response = await fetch("/api/cards");
      let cards = await response.json();
      return cards;
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }
  useEffect(() => {
    getCards().then((cards) => setCards(cards));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && image && des) {
      try {
        let response = await fetch("/api/cards", {
          method: "POST",
          body: JSON.stringify({
            name,
            image,
            alt,
            des,
            level,
          }),
        });

        response = await response.json();
        setStatus("Add Card Success");
        getCards().then((cards) => setCards(cards));
        setName("");
        setImage("");
        setAlt("");
        setDes("");
        setLevel("");
      } catch (error) {
        console.error(error);
        setError(error);
      }
    } else {
      return setError("Name, Image and Description fields are requied!");
    }
  };

  const handleDelete = async (id) => {
    try {
      let response = await fetch(`/api/cards/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });

      response = await response.json();
      setStatus("Delete Card Success");
      getCards().then((cards) => setCards(cards));
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <main className="MainWrapper flex-center h-screen w-screen overflow-x-hidden">
      <Reveal>
        <ul className="CardsLists flex max-w-lg flex-col justify-start gap-4">
          {cards &&
            cards.length > 0 &&
            cards.map((card) => {
              return (
                <CardList
                  key={card._id}
                  card={card}
                  handleDelete={handleDelete}
                />
              );
            })}
        </ul>
      </Reveal>
      <Reveal>
        <form
          className="FormCardsCreate w-96 rounded-lg bg-grey_08 p-4"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="Error">
              <span className="ErrorText text-base text-red-500">{error}</span>
            </div>
          )}
          {status && (
            <div className="Status">
              <span className="StatusText text-base text-blue">{status}</span>
            </div>
          )}
          <div className="FormWraper">
            <label
              htmlFor="name"
              className="InputLabel text-base font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="Input w-full rounded-md px-3 py-2 text-base text-grey"
            />
          </div>
          <div className="FormWraper">
            <label
              htmlFor="image"
              className="InputLabel text-base font-medium text-white"
            >
              Image
            </label>
            <input
              type="text"
              id="image"
              name="image"
              placeholder="image..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="Input w-full rounded-md px-3 py-2 text-base text-grey"
            />
          </div>
          <div className="FormWraper">
            <label
              htmlFor="alt"
              className="InputLabel text-base font-medium text-white"
            >
              Alt
            </label>
            <input
              type="text"
              id="alt"
              name="alt"
              placeholder="alt..."
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="Input w-full rounded-md px-3 py-2 text-base text-grey"
            />
          </div>
          <div className="FormWraper">
            <label
              htmlFor="level"
              className="InputLabel text-base font-medium text-white"
            >
              Level
            </label>
            <input
              type="number"
              id="level"
              name="level"
              placeholder="level..."
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="Input w-full rounded-md px-3 py-2 text-base text-grey"
            />
          </div>
          <div className="FormWraper">
            <label
              htmlFor="des"
              className="InputLabel text-base font-medium text-white"
            >
              Description
            </label>
            <textarea
              type="text"
              id="des"
              name="des"
              rows={4}
              placeholder="description..."
              value={des}
              onChange={(e) => setDes(e.target.value)}
              className="Input w-full rounded-md px-3 py-2 text-base text-grey"
            />
          </div>
          <button
            type="submit"
            className="SubmitButton rounded-lg bg-blue px-3 py-2"
          >
            <span className="SubmitButtonText text-white">Add Card</span>
          </button>
        </form>
      </Reveal>
    </main>
  );
}
