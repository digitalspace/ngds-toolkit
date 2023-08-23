import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { snippets } from './text-input-snippets'

@Component({
  selector: 'text-input-demos',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit {
  public form;
  public isDisabled = false;
  public isLoading = false;
  public snippets = snippets;

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      basicText: new UntypedFormControl(null),
      resetInput: new UntypedFormControl(null),
      disabledInput: new UntypedFormControl(null),
      initialDefault: new UntypedFormControl(
        'My default value', {nonNullable: true}
      ),
      loadingInput: new UntypedFormControl(null),
      requiredInput: new UntypedFormControl(null, Validators.required),
      customValidator: new UntypedFormControl(null, [this.customValidator()]),
      inline: new UntypedFormControl(null),
    })
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === 'invalid') {
        return { customValidator: 'The value of this input cannot be "invalid"' }
      }
      return null;
    }
  }

  disabledSwitch(){
    this.isDisabled = !this.isDisabled;
  }

  loadingSwitch(){
    this.isLoading = !this.isLoading;
  }

  valueChanged(e) {
    console.log('ValueChanged:', e);
  }

  statusChanged(e) {
    console.log('statusChanged:', e);
  }
}