import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { Router } from '@angular/router';

// import { basicTextInputTemplate } from './text-input/basic-text/basic-text-input.component';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {

  public form;
  public fields: any = {};
  public subscriptions = new Subscription();
  public asyncData: any = {};
  public countdown = 4;

  public basicText;
  public basicHTML

  

  constructor(
    private router: Router
  ) {
    const timeStep = () => {
      if (this.countdown > 1) {
        this.countdown--;
        setTimeout(timeStep, 1000);
      } else {
        this.countdown = 0;
        this.fields.asyncData.setValue('async data');
      }
    }
    timeStep();
  }

  navTo(route) {
    this.router.navigate([route]);
  }

  // Custom validator. Invalidates field if the field value is 'invalid'
  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === 'invalid') {
        return { customValidator: true }
      }
      return null;
    }
  }

  clearSelection() {
    this.fields.placeholder.reset();
  }

  ngOnInit() {
    // create form
    this.form = new UntypedFormGroup(
      {
        basicText: new UntypedFormControl(''),
        placeholder: new UntypedFormControl(''),
        disabledText: new UntypedFormControl(''),
        textWithDefaultValue: new FormControl(
          'Default value', {nonNullable: true}
        ),
        invalidField: new UntypedFormControl(''),
        requiredText: new UntypedFormControl('', [Validators.required]),
        customValidator: new UntypedFormControl('', [this.customValidator()]),
        loadWhile: new UntypedFormControl(''),
        asyncData: new UntypedFormControl(''),
        inputTextGroup: new UntypedFormControl(''),
        inputIconGroup: new UntypedFormControl(''),
        inputButtonGroup: new UntypedFormControl(''),
      }
    )
    for (const control of Object.keys(this.form.controls)) {
      this.fields[control] = this.form.controls[control];
    }
  }

  getValue() {
    console.log('this.form.value:', this.form.value);
  }

  getForm() {
    console.log('this.form:', this.form);
  }

  buttonGroupClick(number) {
    this.form.controls.inputButtonGroup.setValue(`Button ${number} pressed.`)
  }

}
