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
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { Eye, EyeSlash } from "iconsax-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export interface SignUpForm {
  email: string;
  password: string;
}

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    router.push("/home/dashboards");
  }

  const onSubmit: SubmitHandler<SignUpForm> = async (signUpData) => {
    console.log(signUpData);
    setLoading(true);
    //TODO: register with user service and validate response
  };

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Card className="w-full max-w-md p-4">
        <CardBody>
          <h1 className="text-4xl font-bold text-foreground">Get started</h1>
          <Spacer y={2}></Spacer>
          <h2 className="text-foreground">Create new account</h2>
          <Spacer y={14}></Spacer>
          <Button
            startContent={<FcGoogle size={24} />}
            onClick={() => {
              signIn("google");
            }}
          >
            Continue with Google
          </Button>
          <Spacer y={2}></Spacer>
          <Button startContent={<IoLogoGithub size={23} />}>
            Continue with Github
          </Button>
          <Divider className="my-4" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              type="email"
              label="Email"
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
              aria-label="Email"
            />
            <Spacer y={2}></Spacer>
            <Input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              label="Password"
              aria-label="Password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? <EyeSlash /> : <Eye />}
                </button>
              }
              type={passwordVisible ? "text" : "password"}
              errorMessage={errors.password?.message}
              isInvalid={!!errors.password}
            />
            <Spacer y={4} />

            <Button type="submit" color="primary" fullWidth isLoading={loading}>
              Continue
            </Button>
          </form>
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
