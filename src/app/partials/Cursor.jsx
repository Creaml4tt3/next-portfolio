"use client";
import React, { useState, useEffect, useRef } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";

export default function Cursor({ active }) {
  const [windowSize, setWindowSize] = useState();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [previousPositions, setPreviousPositions] = useState([]);
  const canvasRef = useRef(null);

  const handleMouseMove = (e) => {
    // Get the scroll offset
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // Adjust the cursor position with the scroll offset
    setTimeout(() => {
      setCursorPosition({ x: e.pageX - scrollX, y: e.pageY - scrollY });
    }, 0);
  };
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    // Add event listener for mouse movement
    document.addEventListener("mousemove", handleMouseMove);

    // Clean up event listener and timeout on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const drawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    ctx.strokeStyle = "#5299ff"; // Customize the line color
    ctx.lineWidth = 4; // Customize the line width

    // Draw a smooth curve through the shortened previous cursor positions to create the trail
    const numPositions = Math.max(previousPositions.length - 1, 0);
    if (numPositions > 0) {
      const startIndex = previousPositions.length - numPositions;
      ctx.beginPath();
      ctx.moveTo(
        previousPositions[startIndex].x,
        previousPositions[startIndex].y
      );
      for (let i = startIndex + 1; i < previousPositions.length; i++) {
        const xMid = (previousPositions[i].x + previousPositions[i - 1].x) / 2;
        const yMid = (previousPositions[i].y + previousPositions[i - 1].y) / 2;
        ctx.quadraticCurveTo(
          previousPositions[i - 1].x,
          previousPositions[i - 1].y,
          xMid,
          yMid
        );
      }
      ctx.lineTo(cursorPosition.x, cursorPosition.y);
      ctx.stroke();
      ctx.closePath();
    }

    // Add the current cursor position to the list of previous positions
    setPreviousPositions((prevPositions) => [...prevPositions, cursorPosition]);

    // Clear the previous positions when the fade-out effect is complete
    if (canvas.style.opacity <= 0) {
      setPreviousPositions([]);
    }

    // Reduce the opacity of the trail over time to create the fade-out effect
    if (canvas.style.opacity > 0) {
      canvas.style.opacity -= 0.03;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.opacity = 1; // Reset the opacity when the cursor moves

      // Use requestAnimationFrame for a smoother animation loop
      let animationFrame;
      const renderLoop = () => {
        drawCanvas();
        animationFrame = requestAnimationFrame(renderLoop);
      };
      animationFrame = requestAnimationFrame(renderLoop);

      // Clean up animation frame on component unmount
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [cursorPosition]);

  return (
    <>
      {active && (
        <canvas
          ref={canvasRef}
          className="custom-cursor-canvas pointer-events-none fixed left-0 top-0 z-[9998]"
          width={windowSize?.width}
          height={windowSize?.height}
        />
      )}
      {cursorPosition && (
        <div
          className="custom-cursor pointer-events-none fixed inset-0 z-[9999] h-12 w-12 -translate-x-[10%] -translate-y-[90%]"
          style={{
            left: cursorPosition.x,
            top: cursorPosition.y,
          }}
        >
          <PencilIcon />
        </div>
      )}
    </>
  );
}
