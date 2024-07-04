"use client";
import React from "react";
import { Avatar, Button, User } from "@nextui-org/react";
import Link from "next/link";
import { Data, Folder } from "iconsax-react";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/shared/Logo";
import FastboardAvatar from "../shared/FastboardAvatar";
import SignOutTest from "../auth/SignOutTest";

const NavButton = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const currentPath = usePathname();
  const isCurrentPath = currentPath.includes(href);

  const bgColor = isCurrentPath ? "bg-foreground" : "bg-transparent";

  const childrenClassName = isCurrentPath ? "text-primary" : "opacity-30";

  const button = (
    <Button
      isIconOnly
      className={`${bgColor} rounded-xl w-[50px] h-[50px] bg-opacity-5`}
    >
      {React.cloneElement(children as React.ReactElement, {
        className: childrenClassName,
      })}
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
          "flex flex-col bg-foreground-100 border-r-1 border-foreground-200 min-w-[120px] justify-between items-center h-[100vh] fixed"
        }
      >
        <div className={"flex justify-center items-center h-[20%]"}>
          <Logo classname={"text-primary"} />
        </div>
        <div
          className={"flex flex-col justify-center items-center gap-8 h-[60%]"}
        >
          {navItems.map((item, index) => (
            <NavButton key={index} href={item.href}>
              {item.icon}
            </NavButton>
          ))}
        </div>
        <FastboardAvatar />
        <SignOutTest />
        <div className={"flex justify-center items-center h-[5%]"}></div>
      </nav>
      <main className={"w-[calc(100vw-120px)] ml-[120px]"}>{children}</main>
    </div>
  );
};

export default HomeNavbarLayout;
