"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/auth";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SessionVerifier = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      return setMounted(true);
    }

    if (!user && !loading) {
      router.push("/auth/login");
    }
  }, [user, loading, mounted]);

  if (!user || !mounted) {
    return (
      <div className={"w-screen h-screen flex justify-center items-center"}>
        <Spinner />
      </div>
    );
  }

  return children;
};

export default SessionVerifier;
