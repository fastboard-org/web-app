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
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
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
