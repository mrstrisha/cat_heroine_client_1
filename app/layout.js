
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Old_Standard_TT } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import ThemeProvider from "./component/ThemeProvider";

const OldStandardTT = Old_Standard_TT({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-old-standard-tt",
});

export const metadata = {
  title: "Car Heroine",
  description: "Community Event Management Platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${OldStandardTT.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ToastContainer position="top-right" autoClose={2000} />
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
