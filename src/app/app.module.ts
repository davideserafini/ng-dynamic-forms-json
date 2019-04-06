import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DynamicSelectComponent } from './components/dynamic-form-fields/dynamic-select/dynamic-select.component';
import { DynamicInputComponent } from './components/dynamic-form-fields/dynamic-input/dynamic-input.component';
import { DynamicFieldDirective } from './directive/dynamic-field.directive';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicButtonComponent } from './components/dynamic-form-fields/dynamic-button/dynamic-button.component';

@NgModule({
  declarations: [
    AppComponent,
    DynamicSelectComponent,
    DynamicInputComponent,
    DynamicFieldDirective,
    DynamicFormComponent,
    DynamicButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DynamicSelectComponent,
    DynamicInputComponent,
    DynamicButtonComponent,
  ]
})
export class AppModule { }
