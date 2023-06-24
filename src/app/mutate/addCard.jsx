"use server";
import clientPromise from "@/app/lib/mongodb";

export async function addCard(request) {
  const client = await clientPromise;
  const db = client.db("cards");
  const { name, image, alt, des, level } = await request;
  return await db.collection("cards").insertOne({
    name,
    image,
    alt,
    des,
    level,
    created_at: Date.now(),
    updated_at: Date.now(),
  });
}
