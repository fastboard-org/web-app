"use client";
import { SignUpForm } from "@/app/auth/signup/page";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";

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
export const auth = getAuth(app);

export async function signUp(signUpData: SignUpForm) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      signUpData.email,
      signUpData.password
    );
  } catch (error) {
    console.error(error);
  }
}

export async function signIn(providerName: "google" | "github" = "google") {
  try {
    let result;
    switch (providerName) {
      case "google":
        result = await signInWithPopup(auth, new GoogleAuthProvider());
        break;
      case "github":
        result = await signInWithPopup(auth, new GithubAuthProvider());
        break;
      default:
        throw new Error("Invalid provider");
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}
