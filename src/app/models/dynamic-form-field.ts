import { DynamicFormFieldConfig } from './dynamic-form-field-config';
import { FormGroup } from '@angular/forms';

export interface DynamicFormField {
  fieldConfig: DynamicFormFieldConfig;
  formGroup: FormGroup;
}
