import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import PublishButton from "./PublishButton";
import DashboardName from "./DashboardName";
import EditorMenu from "./EditorMenu";
import { ThemeSwitcher } from "../layout/ThemeSwitcher";

export default function EditorNavbar() {
  return (
    <Navbar maxWidth="full" className="bg-content2">
      <NavbarContent justify="start">
        <NavbarItem>
          <EditorMenu />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="center">
        <NavbarItem>
          <DashboardName />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <PublishButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
