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
    document.addEventListener("wheel", handleWheel, { passive: false });
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
    router.replace(url);
  };

  const navMenus = [
    {
      name: "Websites",
      url: "/web-development",
    },
    {
      name: "Illustrators",
      url: "/graphic-&-illustrator",
    },
    {
      name: "3D Modelings",
      url: "/3d-modeling",
    },
    {
      name: "Motions",
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
        delay: 0.1,
      }}
      // style={{ translateX: "-50%" }}
      className={`NavBar group fixed left-0 right-0 top-[5dvh] z-[100] mx-auto flex w-fit items-center justify-between gap-2 overflow-hidden rounded-xl border-2 border-black bg-bg px-1 pb-2 pt-1 shadow-medium_solid ${
        navToggle
          ? "transition-button hover:translate-y-medium_solid hover:shadow-none"
          : ""
      }`}
    >
      <div className="Nav flex">
        <button
          onClick={() => handleRedirect("/")}
          className={`NavButton transition-button group rounded-md border-2 border-solid border-black bg-blue px-3 py-3 shadow-medium_solid hover:translate-y-medium_solid hover:shadow-none ${
            active === "/" ? "translate-y-medium_solid shadow-none" : ""
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
                className={`NavButton transition-button min-w-max rounded-lg border-2 border-black bg-white px-3 py-3 shadow-medium_solid hover:translate-y-medium_solid hover:shadow-none ${
                  active === menu.url
                    ? "translate-y-medium_solid shadow-none"
                    : ""
                }`}
              >
                <span className="NavText text-base font-bold text-black">
                  {menu.name}
                </span>
              </button>
            );
          })}
      </div>
      <button
        onClick={toggleNavToggle}
        className={`NavIcon absolute left-0 top-0 h-full w-full cursor-pointer bg-bg transition-all duration-300 group-hover:scale-125 ${
          navToggle ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Lottie lottieRef={eyeRef} animationData={eyeLottie} />
      </button>
    </motion.nav>
  );
}
