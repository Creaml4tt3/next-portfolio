import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

const nextAuthResponse = {
  status: "false",
  message: "unauthorized",
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db("cards");

      const cards = await db.collection("cards").find({}).toArray();
      return NextResponse.json(cards);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  } else {
    return NextResponse.json(nextAuthResponse);
  }
}
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db("cards");
      const { name, image, alt, des, level } = await request.json();
      const card = await db.collection("cards").insertOne({
        name: name,
        image: image,
        alt: alt,
        des: des,
        level: level,
      });
      return NextResponse.json(card);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  } else {
    return NextResponse.json(nextAuthResponse);
  }
}
