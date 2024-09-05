import { Link } from "@nextui-org/react";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen w-full bg-background">
      <p>Page not found</p>
      <Link href="/home/dashboards" showAnchorIcon>
        Go home
      </Link>
    </main>
  );
}
