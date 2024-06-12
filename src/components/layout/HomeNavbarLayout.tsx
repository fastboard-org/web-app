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

  const bgColor = currentPath === href ? "bg-foreground-300" : "bg-transparent";

  return (
    <Link href={href}>
      <Button
        isIconOnly
        className={`${bgColor} rounded-[50%] w-[50px] h-[50px]`}
      >
        {children}
      </Button>
    </Link>
  );
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
          "flex flex-col bg-foreground-100 min-w-[120px] justify-center items-center gap-8"
        }
      >
        {navItems.map((item, index) => (
          <NavButton key={index} href={item.href}>
            {item.icon}
          </NavButton>
        ))}
      </nav>
      <main className={"flex-1"}>{children}</main>
    </div>
  );
};

export default HomeNavbarLayout;
