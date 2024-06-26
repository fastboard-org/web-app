import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import PublishButton from "./PublishButton";
import DashboardName from "./DashboardName";
import EditorMenu from "./EditorMenu";
import { ThemeSwitcher } from "../layout/ThemeSwitcher";

export default function EditorNavbar() {
  return (
    <Navbar maxWidth="full" className="bg-background shadow p-0.5">
      <NavbarContent justify="start">
        <NavbarItem>
          <EditorMenu />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher size="md" />
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
