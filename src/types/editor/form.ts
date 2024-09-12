import { ComponentId } from ".";
import { Query, RestQueryData } from "../connections";
import { Color } from "./style-types";

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
  defaultValueKey: string;
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
          required: false,
          type: InputType.TextInput,
          label: "Text input",
          placeHolder: "Enter text",
          defaultValueKey: "",
        };
      case InputType.NumberInput:
        return {
          formDataKey: "",
          required: false,
          type: InputType.NumberInput,
          label: "Number input",
          placeHolder: "Enter number",
          defaultValueKey: "",
        };
      case InputType.Select:
        return {
          formDataKey: "",
          required: false,
          type: InputType.Select,
          label: "Select",
          options: [],
          defaultValueKey: "",
        };
      case InputType.Checkbox:
        return {
          formDataKey: "",
          required: false,
          type: InputType.Checkbox,
          label: "Checkbox",
          checked: false,
          defaultValueKey: "",
        };
      default:
        return {
          formDataKey: "",
          required: false,
          type: InputType.TextInput,
          label: "Text input",
          placeHolder: "Enter text",
          defaultValueKey: "",
        };
    }
  }
}

export interface DataProvider {
  componentId: ComponentId;
  property: string;
}

export class FormProperties {
  title: string = "Form title";
  submitQueryId: string | null = null;
  submitQueryData: RestQueryData | null = null;
  queryParameters: Record<string, any> = {};
  submitButtonLabel: string = "Submit";
  inputs: InputProperties[] = [];
  showShadow: boolean = true;
  initialData: Object | null = null;
  dataProvider: DataProvider | null = null;
  submitColor: Color = {
    light: "#006FEE",
    dark: "#006FEE",
  };

  static default(): FormProperties {
    return new FormProperties();
  }
}
