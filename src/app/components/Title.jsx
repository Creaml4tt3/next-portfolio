export default function Title({ children, className, font }) {
  return (
    <div
      className={
        "Title text-center text-[min(15vw,80px)] uppercase text-white " +
        className
      }
      style={font?.style}
    >
      {children}
    </div>
  );
}
