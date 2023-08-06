"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { readWebs, createWeb, deleteWeb } from "../mutate/Webs";

import { stackOptions } from "./stackOptions";

const Reveal = dynamic(() => import("../components/Reveal"));

export default function Webs() {
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
  const [stack, setStack] = useState([]);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [webs, setWebs] = useState([]);

  const imageRef = useRef(null);
  const selectRef = useRef(null);

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

  function updateWebs() {
    readWebs().then((webs) => setWebs(JSON.parse(webs)));
  }

  function clearInputs() {
    setName("");
    setImage("");
    setTempImage("");
    setAlt("");
    setDes("");
    setStack("");
    setLink("");
    selectRef.current.clearValue();
    imageRef.current.value = "";
  }

  useEffect(() => {
    updateWebs();
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
        await createWeb({
          name,
          image: imageUrl,
          alt,
          des,
          stack,
          link,
        });
        updateWebs();
        setStatus("Add Web Success");
        setError("");
        clearInputs();
      } catch (error) {
        console.error(error);
        setError(error);
      }
    } else {
      return setError("All fields are requied!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteWeb({ id });
      updateWebs();
      setStatus("Delete Web Success");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  if (session) {
    return (
      <main className="MainWrapper flex-center min-h-screen w-screen overflow-y-auto overflow-x-hidden">
        <Reveal>
          <div className="CardsLists flex max-w-lg flex-col justify-start gap-4">
            {webs &&
              webs.map((web) => {
                return (
                  <Link href={`/webs/${web._id}`} key={web._id}>
                    <div className="text-black">
                      <span>{web.name}</span>
                      <Image
                        src={web.image}
                        alt={web.alt}
                        width={120}
                        height={120}
                      />
                      <span>{web.link}</span>
                      <span className="line-clamp-2">{web.des}</span>
                      <div className="flex-center gap-2">
                        {web.stack.length > 1
                          ? web.stack.map((st) => {
                              return <span key={st}>{st}</span>;
                            })
                          : web.stack[0]}
                      </div>
                      <button onClick={() => handleDelete(web._id)}>
                        Delete
                      </button>
                    </div>
                  </Link>
                );
              })}
          </div>
        </Reveal>
        <Reveal>
          <form
            className="FormCardsCreate w-96 rounded-lg bg-grey_08 p-4"
            onSubmit={handleSubmit}
          >
            {error && (
              <div className="Error">
                <span className="ErrorText text-base text-red-500">
                  {error}
                </span>
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
                htmlFor="stack"
                className="InputLabel text-base font-medium text-white"
              >
                Stack
              </label>
              <CreatableSelect
                ref={selectRef}
                id="stack"
                name="stack"
                isMulti
                options={stackOptions}
                placeholder-="stack..."
                onChange={(e) =>
                  setStack(Array.from(e).map((option) => option.value))
                }
              />
            </div>
            <div className="FormWraper">
              <label
                htmlFor="link"
                className="InputLabel text-base font-medium text-white"
              >
                Link
              </label>
              <input
                type="text"
                id="link"
                name="link"
                placeholder="link..."
                value={link}
                onChange={(e) => {
                  setLink(e.target.value);
                }}
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
              <span className="SubmitButtonText text-white">Add Web</span>
            </button>
          </form>
        </Reveal>
      </main>
    );
  }
}
