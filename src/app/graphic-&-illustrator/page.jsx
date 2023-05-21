"use client";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
const Blob = dynamic(() => import("../components/Blob"));
const Reveal = dynamic(() => import("../components/Reveal"));

export default function Graphic() {
  return (
    <Reveal>
      <div className="BlobContainer min-h-screen w-screen">
        <Canvas
          camera={{ position: [0.0, 0.0, 8.0] }}
          className="Canvas"
          style={{ width: "100dvw", height: "100dvh" }}
        >
          <Blob />
        </Canvas>
      </div>
    </Reveal>
  );
}
