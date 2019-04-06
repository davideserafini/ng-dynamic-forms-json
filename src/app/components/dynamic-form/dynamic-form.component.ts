import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';

import { DynamicFormFieldConfig } from '../../models/dynamic-form-field-config';
import { Validation } from '../../models/validation';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() dynamicFormConfig: DynamicFormFieldConfig[] = [];
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.createDynamicFormGroup(this.dynamicFormConfig, this.formBuilder.group({}));
  }

  createDynamicFormGroup(formConfig: DynamicFormFieldConfig[], formGroup: FormGroup): FormGroup {
    formConfig.forEach((fieldConfig: DynamicFormFieldConfig) => {
      fieldConfig = fieldConfig as DynamicFormFieldConfig;
      const formControl = this.formBuilder.control(
        fieldConfig.value,
        this.addValidation(fieldConfig.validations)
      );
      formGroup.addControl(fieldConfig.name, formControl);
    });

    return formGroup;
  }

  addValidation(validations: Validation[] = []) {
    const validatorsList: ValidatorFn[] = [];
    validations.forEach(validation => {
      const key = validation.name;
      const value = validation.value;

      switch (key) {
        case 'required':
        case 'email':
          validatorsList.push(Validators[key]);
          break;
        case 'minLength':
          validatorsList.push(Validators.minLength(value as number));
          break;
      }
    });
    return Validators.compose(validatorsList);
  }

  onSubmit() {
    this.form.markAsTouched();
    this.submitted.emit(this.form.value);
  }
}
