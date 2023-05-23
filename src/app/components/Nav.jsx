"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import eyeLottie from "@public/lotties/eye.json";
import { useRouter } from "next/navigation";

export default function Nav({ active, handleNav }) {
  const [navToggle, setNavToggle] = useState(false);
  const [navSize, setNavSize] = useState({});
  const navRef = useRef(null);
  const eyeRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    document.addEventListener("wheel", handleWheel);
    window.addEventListener("resize", handleResize);
    setTimeout(() => {
      if (navRef.current) {
        setNavSize({
          width: navRef.current.offsetWidth,
          height: navRef.current.offsetHeight,
        });
      }
    }, 100);
    if (eyeRef.current) {
      eyeRef.current.setSpeed(0.6);
    }
  }, []);

  const handleResize = () => {
    if (!navToggle) {
      if (navRef.current) {
        setNavSize({
          width: navRef.current.offsetWidth,
          height: navRef.current.offsetHeight,
        });
      }
    }
  };

  const handleWheel = (e) => {
    if (e.deltaY && e.deltaY > 0) {
      setNavToggle(true);
    } else if (e.deltaY && e.deltaY < 0) {
      setNavToggle(false);
    }
  };

  const toggleNavToggle = () => {
    setNavToggle(!navToggle);
  };

  const handleRedirect = (url) => {
    handleNav(url);
    setTimeout(() => {
      router.replace(url);
    }, 250);
  };

  const navMenus = [
    {
      name: "Web Development",
      url: "/web-development",
    },
    {
      name: "Graphic & Illustrator",
      url: "/graphic-&-illustrator",
    },
    {
      name: "3D Modeling",
      url: "/3d-modeling",
    },
    {
      name: "Motion Graphic",
      url: "/montion-graphic",
    },
  ];

  return (
    <motion.nav
      ref={navRef}
      initial={false}
      animate={{
        width: navToggle ? navSize.height : navSize.width,
      }}
      transition={{
        type: "spring",
        ease: "easeOut",
        duration: 0.5,
        stiffness: 90,
      }}
      style={{ translateX: "-50%" }}
      className="NavBar fixed bottom-[5svh] left-1/2 z-50 flex items-center justify-between gap-2 overflow-hidden rounded-xl bg-grey_08 p-2"
    >
      <div className="Nav flex">
        <button
          onClick={() => handleRedirect("/")}
          className={`NavButton group rounded-md border border-solid border-blue bg-blue px-3 py-4 transition-all duration-300 hover:border-white ${
            active === "/" ? "border-white" : ""
          }`}
        >
          <span
            className={`NavText text-base font-bold text-grey transition-all duration-300 group-hover:text-white ${
              active === "/" ? "text-white" : ""
            }`}
          >
            creaml4tt3
          </span>
        </button>
      </div>
      <div className="Nav flex-center gap-2">
        {navMenus &&
          navMenus.map((menu) => {
            return (
              <button
                key={menu.name}
                onClick={() => handleRedirect(menu.url)}
                className={`NavButton min-w-max rounded-lg border border-solid border-grey_08 bg-grey_08 px-3 py-4 transition-all duration-300 hover:border-white ${
                  active === menu.url ? "border-white" : ""
                }`}
              >
                <span className="NavText text-base font-normal text-white">
                  {menu.name}
                </span>
              </button>
            );
          })}
      </div>
      <button
        onClick={toggleNavToggle}
        className={`NavIcon absolute left-0 top-0 h-full w-full cursor-pointer bg-blue transition-all duration-300 ${
          navToggle ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Lottie lottieRef={eyeRef} animationData={eyeLottie} />
      </button>
    </motion.nav>
  );
}
