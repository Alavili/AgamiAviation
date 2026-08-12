import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "AGAMI Aviation",
  description: "One-Stop GSE. Hire. Purchase. Service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
