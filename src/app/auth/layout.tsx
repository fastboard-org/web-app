import HomeNavbarLayout from "@/components/layout/HomeNavbarLayout";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
import Logo from "@/components/layout/shared/Logo";
import { Image, Spacer } from "@nextui-org/react";

export default function LogInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-row">
      <div className="flex-1 bg-background flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center p-5 w-full">
          <Logo classname="text-primary" />
          <Spacer x={2} />
          <h1 className="font-bold text-primary text-2xl">Fastboard</h1>
        </div>
        {children}
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-content2">
        <Image
          sizes="2xl"
          alt="Fastboard SingUp Image"
          src="../SingUpImage.png"
        />
      </div>
    </div>
  );
}
