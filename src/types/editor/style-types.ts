import { semanticColors } from "@nextui-org/react";

export class Color {
  light: string;
  dark: string;

  constructor(light: string, dark: string) {
    this.light = light;
    this.dark = dark;
  }

  static default(): Color {
    return new Color("#ffffff", "#000000");
  }

  static primary(): Color {
    // @ts-ignore
    const primaryColor = semanticColors.light.focus.DEFAULT;
    return new Color(primaryColor, primaryColor);
  }
}
