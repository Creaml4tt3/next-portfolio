"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCards } from "../mutate/getCards";
import { addCard } from "../mutate/addCard";

const Reveal = dynamic(() => import("../components/Reveal"));
const CardList = dynamic(() => import("../components/CardList"));

export default function Cards() {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [alt, setAlt] = useState("");
  const [des, setDes] = useState("");
  const [level, setLevel] = useState(3);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [cards, setCards] = useState([""]);

  const imageRef = useRef(null);

  async function uploadFile() {
    const data = new FormData();
    data.append("file", image);
    data.append("public_id", `creaml4tt3/${image.name}`);
    data.append("upload_preset", "creaml4tt3");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/duoaqfhpz/image/upload",
        data
      );
      return response;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  useEffect(() => {
    getCards().then((cards) => setCards(JSON.parse(cards)));
  }, []);
  useEffect(() => {
    if (typeof image === "object") {
      const imageUrl = URL.createObjectURL(image);
      setTempImage(imageUrl);
    }
  }, [image]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && image && des) {
      let imageUrl;
      await uploadFile().then((res) => {
        imageUrl = res.data.secure_url;
      });
      try {
        // let response = await fetch("/api/cards", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     name,
        //     imageUrl,
        //     alt,
        //     des,
        //     level,
        //   }),
        // });
        const data = {
          name,
          image: imageUrl,
          alt,
          des,
          level,
        };
        await addCard(data);
        // response = await response.json();
        setError("");
        setStatus("Add Card Success");
        getCards().then((cards) => setCards(JSON.parse(cards)));
        setName("");
        setImage("");
        imageRef.current.value = "";
        setTempImage("");
        setAlt("");
        setDes("");
        setLevel(3);
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
      });

      response = await response.json();
      setStatus("Delete Card Success");
      getCards().then((cards) => setCards(JSON.parse(cards)));
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <main className="MainWrapper flex-center h-fit min-h-screen w-screen overflow-y-auto overflow-x-hidden">
      <Reveal>
        <ul className="CardsLists flex max-w-lg flex-col justify-start gap-4">
          {cards &&
            cards.length > 0 &&
            cards.map((card, index) => {
              return (
                <CardList key={index} card={card} handleDelete={handleDelete} />
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
            {tempImage && (
              <Image src={tempImage} alt={alt} width={120} height={120} />
            )}
            <label
              htmlFor="image"
              className="InputLabel text-base font-medium text-white"
            >
              Image
            </label>
            <input
              ref={imageRef}
              type="file"
              id="image"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              className="Input y w-full rounded-md px-3 py-2 text-base text-white"
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
