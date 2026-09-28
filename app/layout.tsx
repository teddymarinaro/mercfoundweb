import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Santa Clara 2026 Mayoral Voter Guide",
    template: "%s | Santa Clara Voter Guide",
  },
  description: "An independent, nonpartisan comparison of Santa Clara's 2026 mayoral candidates.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
