"use client";
import { FirebaseError, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
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

export class FastboardAuthError extends Error {
  cause: { inputKey: "email" | "password"; message: string }[];

  constructor(cause: { inputKey: "email" | "password"; message: string }[]) {
    super("FastboardAuthError");
    this.cause = cause;
  }
}

export async function signUp(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use": {
          throw new FastboardAuthError([
            { inputKey: "email", message: "Email already in use" },
          ]);
        }
        case "auth/invalid-email": {
          throw new FastboardAuthError([
            { inputKey: "email", message: "Invalid email" },
          ]);
        }
        default: {
          console.error(error.code, error.message);
        }
      }
    }
  }
}

export async function logIn(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-credential": {
          throw new FastboardAuthError([
            { inputKey: "email", message: "Invalid credentials" },
            { inputKey: "password", message: "Invalid credentials" },
          ]);
        }
        default: {
          console.error(error.code, error.message);
        }
      }
    }
  }
}

export async function signIn(providerName: "google" | "github" = "google") {
  try {
    let result;
    switch (providerName) {
      case "google":
        const googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({
          prompt: "select_account",
        });
        result = await signInWithPopup(auth, googleProvider);
        break;
      case "github":
        const githubProvider = new GithubAuthProvider();
        githubProvider.setCustomParameters({
          prompt: "select_account",
        });
        result = await signInWithPopup(auth, githubProvider);
        break;
      default:
        throw new Error("Invalid provider");
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function signOut() {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
}
