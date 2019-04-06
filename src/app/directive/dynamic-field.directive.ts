import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';

import { FormGroup } from '@angular/forms';

import { DynamicFormField } from '../models/dynamic-form-field';
import { DynamicFormFieldConfig } from '../models/dynamic-form-field-config';
import { DynamicInputComponent } from '../components/dynamic-form-fields/dynamic-input/dynamic-input.component';
import { DynamicSelectComponent } from '../components/dynamic-form-fields/dynamic-select/dynamic-select.component';
import { DynamicButtonComponent } from '../components/dynamic-form-fields/dynamic-button/dynamic-button.component';

const componentMapper = {
  input: DynamicInputComponent,
  select: DynamicSelectComponent,
  button: DynamicButtonComponent
};


@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() fieldConfig: DynamicFormFieldConfig;
  @Input() formGroup: FormGroup;
  componentRef: ComponentRef<DynamicFormField>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    const componentToCreate = componentMapper[this.fieldConfig.type];
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory<DynamicFormField>(componentToCreate);
    this.componentRef = this.viewContainerRef.createComponent(componentFactory);
    this.componentRef.instance.fieldConfig = this.fieldConfig;
    this.componentRef.instance.formGroup = this.formGroup;
  }

}
