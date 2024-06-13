import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import PublishButton from "./PublishButton";
import DashboardName from "./DashboardName";
import EditorMenu from "./EditorMenu";

export default function EditorNavbar() {
  return (
    <div className="w-full">
      <Navbar maxWidth="full">
        <NavbarContent justify="start">
          <NavbarItem>
            <EditorMenu />
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
    </div>
  );
}
