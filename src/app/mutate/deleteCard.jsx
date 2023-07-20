"use server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function deleteCard(request) {
  const client = await clientPromise;
  const db = client.db("cards");
  const { id } = await request;
  return await db.collection("cards").deleteOne({
    _id: new ObjectId(id),
  });
}
