import { Manrope } from "next/font/google";
import "./globals.scss";

const ManropeFont = Manrope({
  subsets: ["latin"],
});

export const metadata = {
  title: "Events Calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ManropeFont.className}`}>{children}</body>
    </html>
  );
}
