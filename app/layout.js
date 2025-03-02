
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import { CartProvider } from './context/CartContext';
import 'react-toastify/dist/ReactToastify.css';
import { Toaster } from 'sonner'

import {
  ClerkProvider
} from '@clerk/nextjs'


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: '400',
  subsets: ["latin"],
});


export const metadata = {
  title: "Kashmir Aromatics",
  description: "Valley's Aromatic Tale",
};



export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.className}>
        <body className={poppins.className} >
          <CartProvider>
            <main className="max-w-screen-xl mx-auto">
              {children}
              <Toaster richColors />
            </main>
          </CartProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
