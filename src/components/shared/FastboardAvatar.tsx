import { auth, signOut } from "@/lib/auth";
import {
  Avatar,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { LoginCurve } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function FastboardAvatar() {
  const router = useRouter();
  const [user, error] = useAuthState(auth);

  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <Avatar as="button" showFallback src={user?.photoURL as string} />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <Button
          variant="light"
          endContent={<LoginCurve size="24" className="text-default-600" />}
          onClick={async () => {
            await signOut();
            router.push("/auth/login");
          }}
        >
          Log out
        </Button>
      </PopoverContent>
    </Popover>
  );
}
