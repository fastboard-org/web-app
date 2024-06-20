import { atom } from "recoil";
import { UserInterface } from "@/types/user";

export const userState = atom({
  key: "userState",
  default: {} as UserInterface,
});
