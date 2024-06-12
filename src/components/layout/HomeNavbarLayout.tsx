"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Data, Folder } from "iconsax-react";
import { usePathname } from "next/navigation";

const NavButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const currentPath = usePathname();
  const isCurrentPath = currentPath === href;

  const bgColor = isCurrentPath ? "bg-foreground-300" : "bg-transparent";

  const button = (
    <Button isIconOnly className={`${bgColor} rounded-[50%] w-[50px] h-[50px]`}>
      {children}
    </Button>
  );

  return !isCurrentPath ? <Link href={href}>{button}</Link> : button;
};

const navItems = [
  {
    icon: <Folder size="24" />,
    href: "/home/dashboards",
  },
  {
    icon: <Data size="24" />,
    href: "/home/connections",
  },
];

const HomeNavbarLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <nav
        className={
          "flex flex-col bg-foreground-100 min-w-[120px] justify-center items-center gap-8 h-[100vh] fixed"
        }
      >
        {navItems.map((item, index) => (
          <NavButton key={index} href={item.href}>
            {item.icon}
          </NavButton>
        ))}
      </nav>
      <main className={"flex-1 ml-[120px]"}>{children}</main>
    </div>
  );
};

export default HomeNavbarLayout;
