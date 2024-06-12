import { atom } from "recoil";
import { UserInterface } from "@/types";

export const userState = atom({
  key: "userState",
  default: {} as UserInterface,
});
