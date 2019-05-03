import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

import { DynamicFormFieldConfig } from '../../models/dynamic-form-field-config';
import { DynamicFormGroupConfig } from '../../models/dynamic-form-group-config';
import { Validation } from '../../models/validation';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() dynamicFormConfig: Array<DynamicFormGroupConfig|DynamicFormFieldConfig> = [];
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.createDynamicFormGroup(this.dynamicFormConfig, this.formBuilder.group({}));
  }

  createDynamicFormGroup(formConfig: Array<DynamicFormGroupConfig|DynamicFormFieldConfig>, formGroup: FormGroup): FormGroup {
    formConfig.forEach((fieldConfig: DynamicFormGroupConfig|DynamicFormFieldConfig) => {
      if (fieldConfig.type === 'group') {
        // Create a nested form group
        fieldConfig = fieldConfig as DynamicFormGroupConfig;

        let nestedFormGroup = this.formBuilder.group({}, { validator: this.addValidation(fieldConfig.validations)});
        nestedFormGroup = this.createDynamicFormGroup(fieldConfig.fields, nestedFormGroup);
        formGroup.addControl(fieldConfig.name, nestedFormGroup);
      } else {
        // Create field
        fieldConfig = fieldConfig as DynamicFormFieldConfig;
        if (fieldConfig.type !== 'button') {
          const formControl = this.formBuilder.control(
            fieldConfig.value,
            this.addValidation(fieldConfig.validations)
          );
          formGroup.addControl(fieldConfig.name, formControl);
        }
      }
    });
    return formGroup;
  }

  addValidation(validations: Validation[] = []) {
    const validatorsList: ValidatorFn[] = [];
    validations.forEach(validation => {
      const name = validation.name;
      const value = validation.value;

      switch (name) {
        case 'required':
        case 'email':
          validatorsList.push(Validators[name]);
          break;
        case 'minlength':
          validatorsList.push(Validators.minLength(value as number));
          break;
        case 'groupRequired':
          validatorsList.push(groupRequiredValidator);
      }
    });
    return validatorsList;
  }

  onSubmit() {
    this.form.markAsTouched();
    this.submitted.emit({ status: this.form.status, values: this.form.value });
  }
}

/**
 * Validators that test if a FormGroup is required
 *
 * @param group
 */
const groupRequiredValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  let allValidRequired = true;
  Object.values(group.controls).forEach(control => {
    if (Validators.required(control) !== null) {
      allValidRequired = false;
    }
  });

  return allValidRequired ? null : { groupRequired: true };
};
