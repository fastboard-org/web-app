import { ComponentId } from ".";
import { Query, RestQueryData } from "../connections";

export enum InputType {
  TextInput = "text-input",
  NumberInput = "number-input",
  Select = "select",
  Checkbox = "checkbox",
  DatePicker = "date-picker",
  FileInput = "file-input",
}

interface BaseInputProperties {
  formDataKey: string;
  required: boolean;
  type: InputType;
  label: string;
  placeHolder: string;
  defaultValueKey: string;
}

export interface TextInputProperties extends BaseInputProperties {}

export interface NumberInputProperties extends BaseInputProperties {}

export interface SelectOptionProperties {
  key: string;
  label: string;
}

export interface SelectProperties extends BaseInputProperties {
  options: SelectOptionProperties[];
}

export interface CheckboxProperties extends BaseInputProperties {
  checked: boolean;
}

export interface DatePickerProperties extends BaseInputProperties {}

export interface FileInputProperties extends BaseInputProperties {
  accept: string[];
  multiple: boolean;
}

export type InputProperties =
  | TextInputProperties
  | NumberInputProperties
  | SelectProperties
  | CheckboxProperties
  | DatePickerProperties
  | FileInputProperties;

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
          defaultValueKey: "",
        };
      case InputType.NumberInput:
        return {
          formDataKey: "",
          required: true,
          type: InputType.NumberInput,
          label: "Number input",
          placeHolder: "Enter number",
          defaultValueKey: "",
        };
      case InputType.Select:
        return {
          formDataKey: "",
          required: true,
          type: InputType.Select,
          label: "Select",
          placeHolder: "Select an option",
          options: [],
          defaultValueKey: "",
        };
      case InputType.Checkbox:
        return {
          formDataKey: "",
          required: true,
          type: InputType.Checkbox,
          label: "Checkbox",
          placeHolder: "Check me",
          checked: false,
          defaultValueKey: "",
        };
      case InputType.DatePicker:
        return {
          formDataKey: "",
          required: true,
          type: InputType.DatePicker,
          label: "Date picker",
          placeHolder: "Select a date",
          defaultValueKey: "",
        };
      case InputType.FileInput:
        return {
          formDataKey: "",
          required: true,
          type: InputType.FileInput,
          label: "File input",
          placeHolder: "Select a file",
          accept: ["all"],
          multiple: false,
          defaultValueKey: "",
        };
      default:
        return {
          formDataKey: "",
          required: true,
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
  submitQueryData: RestQueryData | null = null;
  queryParameters: Record<string, any> = {};
  submitButtonLabel: string = "Submit";
  inputs: InputProperties[] = [];
  showShadow: boolean = true;
  initialData: Object | null = null;
  dataProvider: DataProvider | null = null;

  static default(): FormProperties {
    return new FormProperties();
  }
}
