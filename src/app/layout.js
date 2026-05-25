import { Geist, Geist_Mono } from "next/font/google";

import { AuthProvider } from "@/context/auth-context";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Agencia Eneryia · Portal",
  description:
    "Dashboard de operaciones para contenido, ads y funnels en Agencia Eneryia",
  icons: {
    icon: "/brand/logo-eneryia.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
