import { Component } from '@angular/core';
import { DynamicFormField } from '../../../models/dynamic-form-field';
import { DynamicFormFieldConfig } from '../../../models/dynamic-form-field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-input.component.html',
  styleUrls: ['./dynamic-input.component.scss']
})
export class DynamicInputComponent implements DynamicFormField {
  fieldConfig: DynamicFormFieldConfig;
  formGroup: FormGroup;

  constructor() {
  }

}
