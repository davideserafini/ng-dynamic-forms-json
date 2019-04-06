import { Component } from '@angular/core';
import { DynamicFormField } from '../../../models/dynamic-form-field';
import { DynamicFormFieldConfig } from '../../../models/dynamic-form-field-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dynamic-button',
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss']
})
export class DynamicButtonComponent implements DynamicFormField {
  fieldConfig: DynamicFormFieldConfig;
  formGroup: FormGroup;

  constructor() { }
}
