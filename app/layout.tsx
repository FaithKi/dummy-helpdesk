import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

//componenets
import Navbar from "./components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Gato Helpdesk",
  description: "Dummy Helpdesk site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
