"use client";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import Logo from "@/components/layout/shared/Logo";
import { Image, Spacer } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { useTheme } from "next-themes";

export default function LogInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = useTheme();

  return (
    <div className="flex min-h-screen flex-row">
      <div className="flex-1 bg-background flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center p-5 w-full">
          <Logo classname="text-primary" />
          <Spacer x={2} />
          <h1 className="font-bold text-primary text-2xl">Fastboard</h1>
        </div>
        <SessionProvider>{children}</SessionProvider>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-content2">
        <Image
          sizes="2xl"
          alt="Fastboard SingUp Image"
          src={
            theme === "light" ? "../SingUpImage.png" : "../SingUpImageDark.png"
          }
        />
      </div>
    </div>
  );
}
