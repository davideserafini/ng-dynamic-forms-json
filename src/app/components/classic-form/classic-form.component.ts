import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';


@Component({
  selector: 'app-classic-form',
  templateUrl: './classic-form.component.html',
  styleUrls: ['./classic-form.component.scss']
})
export class ClassicFormComponent implements OnInit {
  @Output() submitted: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      role: ['user'],
      gender: ['', Validators.required],
      address: this.formBuilder.group({
        street: [''],
        zip: ['']
      }, { validator: groupRequiredValidator })
    });
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

const groupRequiredValidator: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  let allValidRequired = true;
  Object.values(group.controls).forEach(control => {
    if (Validators.required(control) !== null) {
      allValidRequired = false;
    }
  });

  return allValidRequired ? null : { groupRequired: true };
};
