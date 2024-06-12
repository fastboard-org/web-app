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

  const bgColor = currentPath === href ? "dark" : "light";

  return (
    <Link href={href}>
      <Button isIconOnly className={`${bgColor} rounded-[50%]`}>
        {children}
      </Button>
    </Link>
  );
};

const navItems = [
  {
    icon: <Folder size="24" color="white" />,
    href: "/home/dashboards",
  },
  {
    icon: <Data size="24" color="white" />,
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
          "flex flex-col bg-[#fdfdfd] min-w-[120px] justify-center items-center gap-8"
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
