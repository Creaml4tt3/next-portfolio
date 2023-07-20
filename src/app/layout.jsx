import localFont from "next/font/local";
import dynamic from "next/dynamic";

import "./globals.scss";

const AppWrapper = dynamic(() => import("./partials/AppWrapper"), {
  ssr: true,
});

const monoFont = localFont({
  src: "../../public/fonts/Font.ttf",
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Creaml4tt3",
  description: "Creaml4tt3 Personal Portfolio",
  openGraph: {
    title: "Creaml4tt3",
    description: "Creaml4tt3 Personal Portfolio",
  },
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={`overflow-x-hidden bg-bg ${monoFont.className}`}>
        <AppWrapper session={session}>{children}</AppWrapper>
      </body>
    </html>
  );
}
