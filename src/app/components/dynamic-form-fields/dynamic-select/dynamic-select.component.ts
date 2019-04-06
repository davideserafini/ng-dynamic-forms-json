import { Component } from '@angular/core';
import { DynamicFormFieldConfig } from '../../../models/dynamic-form-field-config';
import { DynamicFormField } from '../../../models/dynamic-form-field';
import { FormGroup } from '@angular/forms';
import { Option } from '../../../models/option';


@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.scss']
})
export class DynamicSelectComponent implements DynamicFormField {
  fieldConfig: DynamicFormFieldConfig;
  formGroup: FormGroup;

  constructor() { }

}
