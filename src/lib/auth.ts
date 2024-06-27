"use server";
import { SignUpForm } from "@/app/auth/signup/page";
import { cookies } from "next/headers";

export async function signUp(signUpData: SignUpForm) {
  cookies().set("currentUser", signUpData.email);

  const jwt: string = "fake-jwt";
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(jwt);
    }, 3000);
  });
}
