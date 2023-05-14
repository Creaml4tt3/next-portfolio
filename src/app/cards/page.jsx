"use client";
import { useState } from "react";
import Reveal from "../components/Reveal";

export default function Cards() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [alt, setAlt] = useState("");
  const [des, setDes] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && alt && des) {
      try {
        let response = await fetch("/api/cards", {
          method: "POST",
          body: JSON.stringify({
            name,
            image,
            alt,
            des,
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        });

        response = await response.json();
        setStatus("Add Card Success");
        setName("");
        setImage("");
        setAlt("");
        setDes("");
      } catch (error) {
        console.error(error);
      }
    } else {
      return setError("All fields are requied!");
    }
  };

  return (
    <main className="MainWrapper flex-center h-screen w-screen overflow-x-hidden">
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
              htmlFor="name"
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
              htmlFor="name"
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
              htmlFor="name"
              className="InputLabel text-base font-medium text-white"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
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
