"use server";
import clientPromise from "@/app/lib/mongodb";

export async function getCards() {
  try {
    const client = await clientPromise;
    const db = client.db("cards");
    const cards = await db.collection("cards").find({}).toArray();
    return JSON.stringify(cards);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
