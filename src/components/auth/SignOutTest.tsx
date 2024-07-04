import { auth, signOut } from "@/lib/auth";
import { Button, Tooltip } from "@nextui-org/react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SignOutTest() {
  const [user, error] = useAuthState(auth);

  if (!user) return null;

  return (
    <Tooltip content="This is only for testing" color="warning">
      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        Sign Out
      </Button>
    </Tooltip>
  );
}
