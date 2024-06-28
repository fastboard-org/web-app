"use server";
import { SignUpForm } from "@/app/auth/signup/page";
import { cookies } from "next/headers";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6zh0HUv7PxuOHKvA5AqaMJ7GE_kh_Npw",
  authDomain: "fastboard-9bcbe.firebaseapp.com",
  projectId: "fastboard-9bcbe",
  storageBucket: "fastboard-9bcbe.appspot.com",
  messagingSenderId: "277710678568",
  appId: "1:277710678568:web:33e4b5d24d62d4b35d631d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function signUp(signUpData: SignUpForm) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    signUpData.email,
    signUpData.password
  );

  cookies().set("currentUser", JSON.stringify(userCredential.user));

  const jwt = await userCredential.user.getIdToken();
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(jwt);
    }, 3000);
  });
}
