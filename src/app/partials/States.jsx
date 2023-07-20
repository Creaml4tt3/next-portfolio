"use client";
import { useState } from "react";

export const NavActive = (pathname) => {
  const [navActive, setNavActive] = useState(pathname ? pathname : "/");
  return [navActive, setNavActive];
};

export const ModalActive = () => {
  const [modalActive, setModalActive] = useState(
    process.env.WIP ? process.env.WIP : false
  );
  return [modalActive, setModalActive];
};
