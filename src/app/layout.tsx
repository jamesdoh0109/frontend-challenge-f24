import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import RecoilProvider from "@/recoil/RecoilProvider";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Penn Course Cart",
  description: "Generated by create next app",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className}>
        <ThemeProvider defaultTheme="system" enableSystem>
          <RecoilProvider>
            <Navbar />
            <main>{children}</main>
          </RecoilProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
