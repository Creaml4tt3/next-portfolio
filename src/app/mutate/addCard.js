"use server";
import clientPromise from "@/app/lib/mongodb";

export async function addCard(request) {
  const client = await clientPromise;
  const db = client.db("cards");
  const { name, image, alt, des, level } = await request;
  const card = await db.collection("cards").insertOne({
    name: name,
    image: image,
    alt: alt,
    des: des,
    level: level,
  });
}
