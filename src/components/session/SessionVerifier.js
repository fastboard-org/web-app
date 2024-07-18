"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/auth";
import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SessionVerifier = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/auth/login");
    }
  }, [user, loading]);

  if (!user) {
    return (
      <div className={"w-screen h-screen flex justify-center items-center"}>
        <Spinner />
      </div>
    );
  }

  return children;
};

export default SessionVerifier;
