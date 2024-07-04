import { signOut } from "@/lib/auth";
import { Button, Tooltip } from "@nextui-org/react";

export default function SignOutTest() {
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
