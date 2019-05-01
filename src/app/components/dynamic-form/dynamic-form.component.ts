import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DynamicFormFieldConfig } from '../../models/dynamic-form-field-config';
import { Validation } from '../../models/validation';



@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() config: DynamicFormFieldConfig[];
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.createDynamicFormGroup(this.config, this.formBuilder.group({}));
  }

  createDynamicFormGroup(formConfig: DynamicFormFieldConfig[], formGroup: FormGroup): FormGroup {
    formConfig.forEach((fieldConfig: DynamicFormFieldConfig) => {
      if (fieldConfig.type !== 'button') {
        const formControl = this.formBuilder.control(
          fieldConfig.value,
          this.addValidation(fieldConfig.validations)
        );
        formGroup.addControl(fieldConfig.name, formControl);
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
      }
    });
    return validatorsList;
  }

  onSubmit() {
    this.validateAllFields(this.form);
    console.log(this.form);
    this.submitted.emit({ status: this.form.status, values: this.form.value });
  }

  validateAllFields(formGroup: FormGroup) {
    formGroup.markAsTouched({ onlySelf: true });

    Object.values(formGroup.controls).forEach((control: FormControl | FormGroup) => {
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
}
