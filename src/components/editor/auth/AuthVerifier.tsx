import React, { useState } from "react";
import { DashboardAuth } from "@/types/editor";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import useExecuteQuery from "@/hooks/adapter/useExecuteQuery";
import { toast } from "sonner";
import { Eye, EyeSlash } from "iconsax-react";
import { useAccessToken } from "@/hooks/useAccessToken";
import { useRecoilValue } from "recoil";
import { isAuthDrawerOpen } from "@/atoms/editor";

const AuthVerifier = ({
  children,
  dashboardId,
  auth,
  mode = "editor",
}: {
  children: React.ReactNode;
  dashboardId: string;
  auth: DashboardAuth;
  mode?: "editor" | "preview";
}) => {
  const { accessToken, updateAccessToken } = useAccessToken({ dashboardId });
  const isAuthOpen = useRecoilValue(isAuthDrawerOpen);

  const { execute, isPending } = useExecuteQuery({
    dashboardId,
    onError: (error) => {
      if (mode === "editor") {
        toast.error("Error on login query: " + error.message);
      } else {
        toast.error("Invalid credentials");
      }
    },
    onSuccess: (response) => {
      if (response.body[auth?.accessTokenField] !== undefined) {
        if (mode === "editor") {
          toast.info(
            "Logged in successfully: Access Token: ",
            response.body[auth?.accessTokenField],
          );
        } else {
          updateAccessToken(response.body[auth?.accessTokenField]);
        }
      } else {
        toast.error("No access token found in response");
      }
    },
  });

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    if (!user || !password) return toast.error("Please fill all fields");

    execute({
      query: auth?.loginQuery,
      parameters: {
        [auth?.userQueryParameter]: user,
        [auth?.passwordQueryParameter]: password,
      },
    });
  };

  return !isAuthOpen || !auth?.enabled || accessToken ? (
    children
  ) : (
    <div className={"w-full h-full flex flex-col items-center justify-center"}>
      <Card className={"w-[400px] p-5"}>
        <CardHeader>
          <h3 className={"text-xl font-medium"}>Welcome back!</h3>
        </CardHeader>
        <CardBody className={"gap-5"}>
          <Input
            label={auth?.userInputLabel}
            isRequired
            onChange={(e) => setUser(e.target.value)}
          />
          <Input
            label={auth?.passwordInputLabel}
            type={passwordVisible ? "text" : "password"}
            isRequired
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <EyeSlash /> : <Eye />}
              </button>
            }
          />
        </CardBody>
        <CardFooter>
          <Button
            color={"primary"}
            className={"w-full"}
            isLoading={isPending}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthVerifier;
