import { AfterViewInit, Component, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SidebarService } from 'src/app/home/sidebar/sidebar.service';

import { snippets } from './multiselect-snippets';

@Component({
  selector: 'multiselects-input-demos',
  templateUrl: './multiselects.component.html',
  styleUrls: ['./multiselects.component.scss']
})
export class MultiselectsComponent implements OnInit, AfterViewInit {
  public form;
  public fields: any = {};
  public isDisabled = false;
  public isLoading = false;
  public snippets = snippets;

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
  @ViewChildren('section') entries: TemplateRef<any>;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      basicTypeaheadMulti: new UntypedFormControl(null),
      programmaticTypeaheadMulti: new UntypedFormControl(null),
      basicPicklistMulti: new UntypedFormControl(null),
      programmaticPicklistMulti: new UntypedFormControl(null),
    })
    for (const control of Object.keys(this.form.controls)) {
      this.fields[control] = this.form.controls[control];
    }
  }

  ngAfterViewInit(): void {
    let list = [];
    if (this.entries['_results']) {
      for (const item of this.entries['_results']) {
        // get title
        let titleIndex = item?.nativeElement?.querySelector('h3');
        list.push({
          href: item?.nativeElement?.id,
          title: titleIndex.innerText
        })
      }
    }
    this.sidebarService.updateList(list);
  }

  programSet() {
    this.fields.programmaticTypeaheadMulti.setValue(['0011', '0012', '0013']);
  }

  programSetPicklist() {
    this.fields.programmaticPicklistMulti.setValue(['0011', '0012', '0013']);
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
        return { customValidator: "You can pick a max of 3 items." };
      }
      return null
    }
  }
}
