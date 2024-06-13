import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import PublishButton from "./PublishButton";
import DashboardName from "./DashboardName";

export default function EditorNavbar() {
  return (
    <div className="w-full">
      <Navbar maxWidth="full">
        <NavbarContent justify="start">
          <NavbarItem></NavbarItem>
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
    </div>
  );
}
