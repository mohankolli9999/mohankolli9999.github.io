import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "mohankolli.exe — Mohan Kolli · AI & Application Security Engineer",
  description:
    "Interactive terminal portfolio of Mohan Kolli — Application & AI Security Engineer. VAPT, AI red teaming, cloud security and DevSecOps. Type a command to explore.",
  authors: [{ name: "Mohan Kolli" }],
  openGraph: {
    title: "mohankolli.exe — Mohan Kolli",
    description:
      "Interactive terminal portfolio. AI & Application Security Engineer. Break it, then build the defense.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>{children}</body>
    </html>
  );
}
