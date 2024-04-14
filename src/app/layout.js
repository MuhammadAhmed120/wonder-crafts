import { Inter } from "next/font/google";

// NAVBAR
import Navbar from "../../components/navbar";

// STYLES
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wonder Crafts",
  description: "Wonder Crafts HR Assignment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="w-[90%] mx-auto">
          <Navbar />
          <div className="my-6">
            {children}
          </div>
        </div>
      </body>
    </html >
  );
}
