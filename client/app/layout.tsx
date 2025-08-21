import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Simulation Evaluation Form",
    default: "Simulation Evaluation Form",
  },
  description: "Template for Simulation Evaluation Form create by next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-background text-foreground dark:bg-gray-900 dark:text-gray-100 font-sans"
      >
        {children}
      </body>
    </html>
  );
}
