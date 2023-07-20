"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Reveal from "@/app/components/Reveal";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { readWeb, updateWeb } from "@/app/mutate/Webs";

import { stackOptions } from "../stackOptions";

export default function Page({ params }) {
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
  const [web, setWeb] = useState(false);

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

  useEffect(() => {
    readWeb({ id: params.id }).then((res) => setWeb(JSON.parse(res)));
  }, [params]);
  useEffect(() => {
    if (web) {
      setName(web?.name ? web.name : "");
      setImage(web?.image ? web.image : "");
      setAlt(web?.alt ? web.alt : "");
      setDes(web?.des ? web.des : "");
      setStack(web?.stack ? web.stack : []);
      setLink(web?.link ? web.link : "");
      console.log(web);
    }
  }, [web]);
  useEffect(() => {
    if (image.length > 0) {
      setTempImage(image);
    }
    if (typeof image === "object") {
      const imageUrl = URL.createObjectURL(image);
      setTempImage(imageUrl);
    }
  }, [image]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl;
    await uploadFile().then((res) => {
      imageUrl = res.data.secure_url;
    });
    try {
      updateWeb({
        id: params.id,
        name,
        image: imageUrl,
        alt,
        des,
        stack,
        link,
      });
      setStatus("Edit Web Success");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  if (session) {
    return (
      <div>
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
              {tempImage && (
                <Image src={tempImage} alt={alt} width={120} height={120} />
              )}
              <input
                type="file"
                id="image"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="Input w-full rounded-md px-3 py-2 text-base text-white"
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
                value={
                  stack &&
                  Array.from(
                    stack.map((st) => {
                      return { value: st, label: st };
                    })
                  )
                }
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
                value={des ? des : ""}
                onChange={(e) => setDes(e.target.value)}
                className="Input w-full rounded-md px-3 py-2 text-base text-grey"
              />
            </div>
            <button
              type="submit"
              className="SubmitButton rounded-lg bg-blue px-3 py-2"
            >
              <span className="SubmitButtonText text-white">Edit Web</span>
            </button>
          </form>
        </Reveal>
      </div>
    );
  }
}
