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
import { SubmitHandler, useForm } from "react-hook-form";
import { useTheme } from "next-themes";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import useDashboard from "@/hooks/dashboards/useDashboard";

interface LogInForm {
  user: string;
  password: string;
}

const AuthVerifier = ({
  children,
  dashboardId,
  auth,
  mode = "editor",
}: {
  children: React.ReactNode;
  dashboardId: string;
  auth?: DashboardAuth | null;
  mode?: "editor" | "preview";
}) => {
  const { theme } = useTheme();
  const { accessToken, updateAccessToken } = useAccessToken({ dashboardId });
  const { updateDashboard } = useDashboard();

  const { updateRefreshToken } = useRefreshToken({ dashboardId });
  const isAuthOpen = useRecoilValue(isAuthDrawerOpen);

  const updateAuth = (auth: any) => {
    updateDashboard((prev) => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        auth: {
          ...prev.metadata.auth,
          ...auth,
        },
      },
    }));
  };

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
      if (auth && response.body[auth?.accessTokenField] !== undefined) {
        if (mode === "editor") {
          toast.success("Logged in successfully");
          if (
            auth?.refreshTokenField &&
            response.body[auth?.refreshTokenField] !== undefined
          ) {
            updateAuth({
              previewAccessToken: response.body[auth?.accessTokenField],
              previewRefreshToken: response.body[auth?.refreshTokenField],
            });
          } else {
            updateAuth({
              previewAccessToken: response.body[auth?.accessTokenField],
            });
          }
        } else {
          updateAccessToken(response.body[auth?.accessTokenField]);

          if (
            auth?.refreshTokenField &&
            response.body[auth?.refreshTokenField] !== undefined
          ) {
            updateRefreshToken(response.body[auth?.refreshTokenField]);
          }
        }
      } else {
        toast.error("No access token found in response");
      }
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LogInForm>();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit: SubmitHandler<LogInForm> = ({ user, password }) => {
    if (!auth) return toast.error("Auth not found");
    if (!user || !password) return toast.error("Please fill all fields");

    execute({
      queryData: auth?.loginQueryData,
      parameters: {
        [auth?.userQueryParameter]: user,
        [auth?.passwordQueryParameter]: password,
      },
    });
  };

  const showAuth = () => {
    if (mode === "editor") {
      return isAuthOpen;
    } else {
      return auth?.enabled && !accessToken;
    }
  };

  return !showAuth() ? (
    children
  ) : (
    <div className={"w-full h-full flex flex-col items-center justify-center"}>
      <Card className={"w-[400px] p-5"}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <h3 className={"text-xl font-medium"}>{auth?.title}</h3>
          </CardHeader>
          <CardBody className={"gap-5"}>
            <Input
              {...register("user", {
                required: "This field is required",
              })}
              errorMessage={errors?.user?.message}
              isInvalid={!!errors.user}
              label={auth?.userInputLabel}
              isRequired
            />
            <Input
              {...register("password", {
                required: "This field is required",
              })}
              errorMessage={errors?.password?.message}
              isInvalid={!!errors.password}
              label={auth?.passwordInputLabel}
              type={passwordVisible ? "text" : "password"}
              isRequired
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
              type={"submit"}
              style={{
                backgroundColor:
                  theme === "light"
                    ? auth?.buttonColor.light
                    : auth?.buttonColor.dark,
                color:
                  theme === "light"
                    ? auth?.buttonTextColor.light
                    : auth?.buttonTextColor.dark,
              }}
            >
              {auth?.buttonText || "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthVerifier;
