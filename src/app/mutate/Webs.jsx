"use server";
import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

export async function readWebs() {
  try {
    const client = await clientPromise;
    const db = client.db("webs");
    return JSON.stringify(await db.collection("webs").find({}).toArray());
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}

export async function readWeb(request) {
  try {
    const client = await clientPromise;
    const db = client.db("webs");
    const { id } = await request;
    return JSON.stringify(
      await db.collection("webs").findOne({
        _id: new ObjectId(id),
      })
    );
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}

export async function createWeb(request) {
  try {
    const client = await clientPromise;
    const db = client.db("webs");
    const { name, image, alt, des, stack, link } = await request;
    return await db.collection("webs").insertOne({
      name,
      image,
      alt,
      des,
      stack,
      link,
      created_at: new Date().toUTCString(),
      updated_at: new Date().toUTCString(),
    });
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}

export async function updateWeb(request) {
  try {
    const client = await clientPromise;
    const db = client.db("webs");
    const { id, name, image, alt, des, stack, link } = await request;
    return await db.collection("webs").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          name: name,
          image: image,
          alt: alt,
          des: des,
          stack: stack,
          link: link,
          updated_at: new Date().toUTCString(),
        },
      }
    );
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}

export async function deleteWeb(request) {
  try {
    const client = await clientPromise;
    const db = client.db("webs");
    const { id } = await request;
    return await db.collection("webs").deleteOne({
      _id: new ObjectId(id),
    });
  } catch (e) {
    console.error(e);
    throw new Error(e).message;
  }
}
