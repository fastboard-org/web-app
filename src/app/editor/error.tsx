"use client";

import { Link } from "@nextui-org/react";
import { useEffect } from "react";

export default function EditorError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    //TODO: Log error to server maybe?
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center h-screen w-full bg-background">
      <p>Something went wrong</p>
      <Link href="/home/dashboards" showAnchorIcon>
        Go home
      </Link>
    </main>
  );
}
