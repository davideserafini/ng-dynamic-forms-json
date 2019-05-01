import { Option } from './option';
import { Validation } from './validation';

export interface DynamicFormFieldConfig {
  // Fields for any form field
  label: string;
  type: string;
  name: string;
  value: string;
  placeholder?: string;
  validations?: Validation[];

  // Fields for inputs
  inputType?: string;

  // Fields for selects, input radio
  options?: Option[];
}
