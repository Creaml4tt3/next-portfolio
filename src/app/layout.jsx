import localFont from "next/font/local";
import dynamic from "next/dynamic";
import Image from "next/image";

import "./globals.scss";

const AppWrapper = dynamic(() => import("./partials/AppWrapper"), {
  ssr: true,
});
const Cursor = dynamic(() => import("./partials/Cursor"), {
  ssr: true,
});

const monoFont = localFont({
  src: "../../public/fonts/Font.woff2",
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
      <body
        className={`body relative overflow-x-hidden bg-bg ${monoFont.className}`}
      >
        <Cursor active={true} />
        <div className="PageWrapperBackground pointer-events-none absolute left-0 top-0 h-full w-full opacity-70 mix-blend-multiply">
          <Image
            src={"/images/bg-paper.webp"}
            blurDataURL={"/images/bg-paper.webp"}
            placeholder="blur"
            alt="Page Wrapper Background"
            width={1000}
            height={1000}
            className="PageWrapperBackgroundImage h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <AppWrapper session={session}>{children}</AppWrapper>
        <footer className="AppFooter pointer-events-none fixed bottom-6 right-6">
          <span className="AppCopyRight text-xs">
            © 2023 creaml4tt3.me - All Rights Reserved. (全著作権所有)
          </span>
        </footer>
      </body>
    </html>
  );
}
