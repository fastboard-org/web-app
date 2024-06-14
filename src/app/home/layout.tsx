import HomeNavbarLayout from "@/components/layout/HomeNavbarLayout";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <HomeNavbarLayout>
      <div className="flex justify-end mr-5 mt-5 absolute right-3">
        <ThemeSwitcher size="md" />
      </div>
      {children}
    </HomeNavbarLayout>
  );
}
