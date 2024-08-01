import { Query } from "../connections";

export class FormProperties {
  title: string = "Form title";
  query: Query | null = null;

  static default(): FormProperties {
    return new FormProperties();
  }
}
