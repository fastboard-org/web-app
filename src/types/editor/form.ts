export class FormProperties {
  title: string = "Form title";

  static default(): FormProperties {
    return new FormProperties();
  }
}
