export default function Title({ children, className, font }) {
  return (
    <div
      className={
        "Title text-center text-[64px] uppercase text-white " + className
      }
      style={font?.style}
    >
      {children}
    </div>
  );
}
