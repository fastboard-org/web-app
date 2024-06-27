"use client";
import {
  Button,
  Card,
  CardBody,
  Divider,
  Input,
  Link,
  Spacer,
} from "@nextui-org/react";
import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Card className="w-full max-w-md p-4">
        <CardBody>
          <h1 className="text-4xl font-bold text-foreground">Welcome back!</h1>
          <Spacer y={2}></Spacer>
          <h2 className="text-foreground">Log in to your account</h2>
          <Spacer y={14}></Spacer>
          <Button startContent={<FcGoogle size={24} />}>
            Log in with Google
          </Button>
          <Spacer y={2}></Spacer>
          <Button startContent={<IoLogoGithub size={23} />}>
            Log in with Github
          </Button>
          <Divider className="my-4" />
          <Input isRequired type="email" label="Email" />
          <Spacer y={2}></Spacer>
          <Input
            isRequired
            label="Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? <EyeSlash /> : <Eye />}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Spacer y={4} />
          <Button color="primary">Log in</Button>
        </CardBody>
      </Card>
      <Spacer y={2} />
      <div className="flex flex-row">
        <h3 className="text-foreground">Don't have an account?</h3>
        <Spacer x={1}></Spacer>
        <Link href="/auth/signup">Sign up</Link>
      </div>
    </main>
  );
}
