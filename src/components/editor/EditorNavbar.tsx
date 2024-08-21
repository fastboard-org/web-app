import {
  Button,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import PublishButton from "./PublishButton";
import DashboardName from "./DashboardName";
import EditorMenu from "./EditorMenu";
import { ThemeSwitcher } from "../layout/ThemeSwitcher";
import Logo from "../layout/shared/Logo";

export default function EditorNavbar() {
  return (
    <Navbar maxWidth="full" className="bg-background shadow p-0.5">
      <NavbarContent justify="start">
        <NavbarItem>
          <Button as={Link} href="/home/dashboards" isIconOnly variant="light">
            <Logo classname="text-primary" />
          </Button>
        </NavbarItem>
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
        <NavbarItem>
          <ThemeSwitcher size="md" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
