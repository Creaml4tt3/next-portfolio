import { useState, createContext } from "react";

export const PathnameContext = createContext(null);

export default function PathnameCont() {
  const [pathname, setPathname] = useState("");
  return <PathnameContext value={{ pathname, setPathname }}></PathnameContext>;
}
