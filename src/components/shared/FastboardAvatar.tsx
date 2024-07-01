import { auth } from "@/lib/auth";
import { Avatar } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function FastboardAvatar() {
  const [user, error] = useAuthState(auth);

  return <Avatar showFallback src={user?.photoURL as string}></Avatar>;
}
