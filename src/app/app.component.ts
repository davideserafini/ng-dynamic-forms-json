import { Component } from '@angular/core';
import { DynamicFormFieldConfig } from './models/dynamic-form-field-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formValues: string;

  // This will be received from the network
  formConfigurationJson: DynamicFormFieldConfig[] = [{
    label: 'Name',
    type: 'input',
    name: 'name',
    value: '',
    inputType: 'text',
    placeholder: 'FVG Dev',
    validations: [{
      name: 'required',
      message: 'Name is required'
    }, {
      name: 'minlength',
      message: 'Name is too short',
      value: 5
    }],
  }, {
    label: 'Email',
    type: 'input',
    name: 'email',
    value: '',
    inputType: 'email',
    placeholder: 'community@fvg.dev',
    validations: [{
      name: 'required',
      message: 'Email is required'
    }, {
      name: 'email',
      message: 'Email format is not correct'
    }],
  }, {
    label: 'Password',
    type: 'input',
    name: 'password',
    value: '',
    inputType: 'password',
    validations: [{
      name: 'required',
      message: 'Password is required'
    }],
  }, {
    label: 'Role',
    type: 'select',
    name: 'role',
    value: 'user',
    options: [{
      value: 'user',
      text: 'User'
    }, {
      value: 'admin',
      text: 'Admin'
    }]
  }, {
    label: 'Submit',
    type: 'button',
    name: 'submit',
    value: ''
  }];

  displayValues(values) {
    this.formValues = values;
  }
}
