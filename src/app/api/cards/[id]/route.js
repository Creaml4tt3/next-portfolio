import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

const nextAuthResponse = {
  status: "false",
  message: "unauthorized",
};

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db("cards");
      const { id } = await params;

      const card = await db.collection("cards").findOne({
        _id: new ObjectId(id),
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

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db("cards");
      const { name, imageUrl, alt, des, level } = await request.json();
      const { id } = await params;

      const card = await db.collection("cards").updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            name: name,
            image: imageUrl,
            alt: alt,
            des: des,
            level: level,
            updated_at: new Date().toUTCString(),
          },
        }
      );
      return NextResponse.json(card);
    } catch (e) {
      console.error(e);
      throw new Error(e).message;
    }
  } else {
    return NextResponse.json(nextAuthResponse);
  }
}

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions);
  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db("cards");
      const { id } = await params;

      const card = await db.collection("cards").deleteOne({
        _id: new ObjectId(id),
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
