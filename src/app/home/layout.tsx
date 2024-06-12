import HomeNavbarLayout from "@/components/layout/HomeNavbarLayout";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HomeNavbarLayout>{children}</HomeNavbarLayout>;
}
