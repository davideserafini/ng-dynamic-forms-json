import { Component, EventEmitter, Input, Output } from '@angular/core';

import { DynamicFormGroupConfig } from '../../models/dynamic-form-group-config';
import { DynamicFormFieldConfig } from '../../models/dynamic-form-field-config';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-dynamic-form-group',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss']
})
export class DynamicFormGroupComponent {
  @Input() dynamicFormConfig: Array<DynamicFormGroupConfig|DynamicFormFieldConfig> = [];
  @Input() formGroup: FormGroup;
}
