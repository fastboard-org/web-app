import { ComponentId } from ".";

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
  placeHolder: string;
  defaultValueKey: string;
}

export interface TextInputProperties extends BaseInputProperties {}

export interface NumberInputProperties extends BaseInputProperties {}

export interface SelectOptionProperties {
  label: string;
}

export interface SelectProperties extends BaseInputProperties {
  options: SelectOptionProperties[];
}

export interface CheckboxProperties extends BaseInputProperties {
  checked: boolean;
}

export interface DatePickerProperties extends BaseInputProperties {}

export type InputProperties =
  | TextInputProperties
  | NumberInputProperties
  | SelectProperties
  | CheckboxProperties
  | DatePickerProperties;

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
          placeHolder: "Select an option",
          options: [],
          defaultValueKey: "",
        };
      case InputType.Checkbox:
        return {
          formDataKey: "",
          required: false,
          type: InputType.Checkbox,
          label: "Checkbox",
          placeHolder: "Check me",
          checked: false,
          defaultValueKey: "",
        };
      case InputType.DatePicker:
        return {
          formDataKey: "",
          required: false,
          type: InputType.DatePicker,
          label: "Date picker",
          placeHolder: "Select a date",
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
