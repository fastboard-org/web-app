import { Query } from "../connections";

export enum InputType {
  TextInput = "text-input",
  NumberInput = "number-input",
  Select = "select",
  Checkbox = "checkbox",
  DatePicker = "date-picker",
}

interface BaseInputProperties {
  formDataKey: string;
  required: boolean;
  type: InputType;
  label: string;
}

export interface TextInputProperties extends BaseInputProperties {
  placeHolder: string;
}

export interface NumberInputProperties extends BaseInputProperties {
  placeHolder: string;
}

export interface SelectProperties extends BaseInputProperties {
  options: string[];
}

export interface CheckboxProperties extends BaseInputProperties {
  checked: boolean;
}

export type InputProperties =
  | TextInputProperties
  | NumberInputProperties
  | SelectProperties
  | CheckboxProperties;

export class DefaultInputProperties {
  static of(type: InputType): InputProperties {
    switch (type) {
      case InputType.TextInput:
        return {
          formDataKey: "",
          required: true,
          type: InputType.TextInput,
          label: "Text input",
          placeHolder: "Enter text",
        };
      case InputType.NumberInput:
        return {
          formDataKey: "",
          required: true,
          type: InputType.NumberInput,
          label: "Number input",
          placeHolder: "Enter number",
        };
      case InputType.Select:
        return {
          formDataKey: "",
          required: true,
          type: InputType.Select,
          label: "Select",
          options: [],
        };
      case InputType.Checkbox:
        return {
          formDataKey: "",
          required: true,
          type: InputType.Checkbox,
          label: "Checkbox",
          checked: false,
        };
      default:
        return {
          formDataKey: "",
          required: true,
          type: InputType.TextInput,
          label: "Text input",
          placeHolder: "Enter text",
        };
    }
  }
}

export class FormProperties {
  title: string = "Form title";
  submitQueryId: string | null = null;
  invalidateQueryId: string | null = null;
  submitButtonLabel: string = "Submit";
  inputs: InputProperties[] = [];

  static default(): FormProperties {
    return new FormProperties();
  }
}
