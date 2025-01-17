
import { Inter } from "next/font/google";
import { Nav } from "./components";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pickup NYC",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
