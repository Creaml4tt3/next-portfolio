"use client";
import { useState, useEffect } from "react";
import Reveal from "@/app/components/Reveal";

export default function Page({ params }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [des, setDes] = useState("");
  const [level, setLevel] = useState(0);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const [card, setCard] = useState([]);

  async function getCard() {
    try {
      let response = await fetch(`/api/cards/${params.id}`);
      return await response.json();
    } catch (error) {
      console.error(error);
      setError(error);
    }
  }

  useEffect(() => {
    getCard().then((res) => setCard(res));
  }, []);
  useEffect(() => {
    setName(card.name ? card.name : "");
    setImage(card.image ? card.image : "");
    setAlt(card.alt ? card.alt : "");
    setDes(card.des ? card.des : "");
    setLevel(card.level ? card.level : 3);
  }, [card]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`/api/cards/${params.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          image,
          alt,
          des,
          level,
        }),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      });
      response = await response.json();
      setStatus("Edit Card Success");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <div>
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
              value={name ? name : ""}
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
              value={image ? image : ""}
              onChange={(e) => setImage(Number(e.target.value))}
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
              value={alt ? alt : ""}
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
              value={level ? level : ""}
              onChange={(e) => setLevel(e.target.value)}
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
              value={des ? des : ""}
              onChange={(e) => setDes(e.target.value)}
              className="Input w-full rounded-md px-3 py-2 text-base text-grey"
            />
          </div>
          <button
            type="submit"
            className="SubmitButton rounded-lg bg-blue px-3 py-2"
          >
            <span className="SubmitButtonText text-white">Edit Card</span>
          </button>
        </form>
      </Reveal>
    </div>
  );
}
