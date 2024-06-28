import { Avatar } from "@nextui-org/react";
import { useSession } from "next-auth/react";

export default function FastboardAvatar() {
  const { data: session } = useSession();

  return <Avatar showFallback src={session?.user?.image as string}></Avatar>;
}
