import clientPromise from "@/app/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("cards");

    const cards = await db.collection("cards").find({}).toArray();
    return NextResponse.json(cards);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("cards");
    const { name, image, alt, des } = await request.json();
    const card = await db.collection("cards").insertOne({
      name: name,
      image: image,
      alt: alt,
      des: des,
    });
    return NextResponse.json(card);
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
