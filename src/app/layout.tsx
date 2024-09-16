import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/app/providers";
import { poppins } from "@/fonts";

export const metadata: Metadata = {
  title: {
    default: "Fastboard",
    template: "Fastboard | %s",
  },
  description: "Create awesome dashboards with Fastboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
