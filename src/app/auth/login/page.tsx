"use client";
import AuthError from "@/components/auth/AuthError";
import { auth, logIn } from "@/lib/auth";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";

interface LogInForm {
  email: string;
  password: string;
}

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LogInForm>();
  const [showLogInError, setShowLogInError] = useState(false);
  const router = useRouter();
  const [user, authLoading, authError] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      router.push("/home/dashboards");
    }
  }, [user]);

  const onSubmit: SubmitHandler<LogInForm> = async (logInData) => {
    setLoading(true);
    try {
      await logIn(logInData.email, logInData.password);
    } catch (error) {
      setShowLogInError(true);
      setError("email", {
        type: "manual",
      });
      setError("password", {
        type: "manual",
      });
    }
    setLoading(false);
  };

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
              Log in
            </Button>
          </form>
        </CardBody>
      </Card>
      <Spacer y={2} />
      {showLogInError && <AuthError message="Invalid email or password" />}
      <Spacer y={2} />
      <div className="flex flex-row">
        <h3 className="text-foreground">Don't have an account?</h3>
        <Spacer x={1}></Spacer>
        <Link href="/auth/signup">Sign up</Link>
      </div>
    </main>
  );
}
