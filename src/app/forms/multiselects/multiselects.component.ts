import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'multiselects-input-demos',
  templateUrl: './multiselects.component.html',
  styleUrls: ['./multiselects.component.scss']
})
export class MultiselectsComponent implements OnInit {
  public form;
  public fields: any = {};
  public isDisabled = false;
  public isLoading = false;

  displayProvinceList = [
    {
      value: '0001',
      display: 'British Columbia'
    },
    {
      value: '0002',
      display: 'Alberta'
    },
    {
      value: '0003',
      display: 'Saskatchewan'
    },
    {
      value: '0004',
      display: 'Manitoba'
    },
    {
      value: '0005',
      display: 'Ontario'
    },
    {
      value: '0006',
      display: 'Quebec'
    },
    {
      value: '0007',
      display: 'Nova Scotia'
    },
    {
      value: '0008',
      display: 'Newfoundland and Labrador'
    },
    {
      value: '0009',
      display: 'New Brunswick'
    },
    {
      value: '0010',
      display: 'Prince Edward Island'
    },
    {
      value: '0011',
      display: 'Yukon'
    },
    {
      value: '0012',
      display: 'Northwest Territories'
    },
    {
      value: '0013',
      display: 'Nunavut'
    },
  ]

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      basicTypeaheadMulti: new UntypedFormControl(null),
      programmaticTypeaheadMulti: new UntypedFormControl(null),
      disabledTypeaheadMulti: new UntypedFormControl(null),
      invalidTypeaheadMulti: new UntypedFormControl(null, [this.customValidator()]),
      basicPicklistMulti: new UntypedFormControl(null),
      programmaticPicklistMulti: new UntypedFormControl(null),
      disabledPicklistMulti: new UntypedFormControl(null),
      invalidPicklistMulti: new UntypedFormControl(null, [this.customValidator()]),
    })
    for (const control of Object.keys(this.form.controls)) {
      this.fields[control] = this.form.controls[control];
    }
  }

  programSet() {
    this.fields.programmaticTypeaheadMulti.setValue(['0005', '0007']);
  }

  programSetPicklist() {
    this.fields.programmaticPicklistMulti.setValue(['0005', '0007']);
  }

  disabledSwitch() {
    this.isDisabled = !this.isDisabled;
  }

  loadingSwitch() {
    this.isLoading = !this.isLoading;
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control?.value;
      console.log('value:', value);
      if (value?.length > 3) {
        return {customValidator: "You can pick a max of 3 items."};
      }
      return null
    }
  }
}
