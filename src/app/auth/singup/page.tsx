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
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { Eye, EyeSlash } from "iconsax-react";

export default function SingUp() {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Card className="w-full max-w-md p-4">
        <CardBody>
          <h1 className="text-4xl font-bold text-foreground">Get started</h1>
          <Spacer y={2}></Spacer>
          <h2 className="text-foreground">Create new account</h2>
          <Spacer y={14}></Spacer>
          <Button startContent={<FcGoogle size={24} />}>
            Continue with Google
          </Button>
          <Spacer y={2}></Spacer>
          <Button startContent={<IoLogoGithub size={23} />}>
            Continue with Github
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
                onClick={toggleVisibility}
              >
                {isVisible ? <EyeSlash /> : <Eye />}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Spacer y={4} />
          <Button color="primary">Continue</Button>
        </CardBody>
      </Card>
      <Spacer y={2} />
      <div className="flex flex-row">
        <h3 className="text-foreground">Have an account?</h3>
        <Spacer x={1}></Spacer>
        <Link href="#">Login</Link>
      </div>
    </main>
  );
}
