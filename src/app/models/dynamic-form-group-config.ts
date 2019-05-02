import { DynamicFormFieldConfig } from './dynamic-form-field-config';
import { Validation } from './validation';

export interface DynamicFormGroupConfig {
  name: string;
  fields: Array<DynamicFormGroupConfig|DynamicFormFieldConfig>;
  validations?: Validation[];
}
