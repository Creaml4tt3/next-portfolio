import { lexendPeta } from "./Fonts";
export default function Title({ children, className }) {
  return (
    <div
      className={
        "Title text-center text-[64px] uppercase text-white " + className
      }
      style={lexendPeta.style}
    >
      {children}
    </div>
  );
}
