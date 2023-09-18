import { Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

import { snippets } from './typeahead-snippets'
import { SidebarService } from 'src/app/home/sidebar/sidebar.service';

export const simpleProvinceList = [
  'British Columbia',
  'Alberta',
  'Saskatchewan',
  'Manitoba',
  'Ontario',
  'Quebec',
  'Nova Scotia',
  'Newfoundland and Labrador',
  'New Brunswick',
  'Prince Edward Island',
  'Yukon',
  'Northwest Territories',
  'Nunavut'
]

export const displayProvinceList = [
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

@Component({
  selector: 'typeaheads-input-demos',
  templateUrl: './typeaheads.component.html',
  styleUrls: ['./typeaheads.component.scss']
})
export class TypeaheadsComponent implements OnInit {
  public form;
  public fields: any = {};
  public subscriptions = new Subscription();
  public isLoading: boolean = false;
  public isDisabled: boolean = false;

  public snippets = snippets;

  public simpleProvinceList = simpleProvinceList;
  public displayProvinceList = displayProvinceList;

  public customTemplateList = displayProvinceList;

  @ViewChild('customTemplate') customTemplate: TemplateRef<any>;
  @ViewChildren('section') entries: TemplateRef<any>;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    // create typeahead form
    this.form = new UntypedFormGroup(
      {
        basicTypeahead: new UntypedFormControl(''),
        displayTypeahead: new UntypedFormControl(''),
        programmaticTypeahead: new UntypedFormControl(''),
        customTemplateTypeahead: new UntypedFormControl(''),
        minLength: new UntypedFormControl(''),
        disableTypeahead: new UntypedFormControl(''),
        invalidTypeahead: new UntypedFormControl('', [this.customValidator()]),
      }
    )
    for (const control of Object.keys(this.form.controls)) {
      this.fields[control] = this.form.controls[control];
    }
  }

  setMultiValue(value) {
    this.fields.multiselectTypeahead.setValue(value)
  }

  setDisplayValue(value) {
    this.fields.displayTypeahead.setValue(value)
  }

  programmaticSet() {
    this.fields.programmaticTypeahead.setValue('0006');
  }

  disableProgrammatically(control) {
    if (this.form.controls[control].enabled) {
      this.form.controls[control].disable();
    } else {
      this.form.controls[control].enable();
    }
  }

  disabledSwitch() {
    this.isDisabled = !this.isDisabled;
  }

  loadingSwitch() {
    this.isLoading = !this.isLoading;
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value);
      if (value === '0011' || value === '0012' || value === '0013') {
        return { customValidator: `This is not a province.` }
      }
      return null
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

  getHighlightedMatch(item, query) {
    query = query.join(' ');
    let display = item.value;
    if (display.toLocaleLowerCase().indexOf(query) > -1) {
      const left_str = display.substring(0, display.toLocaleLowerCase().indexOf(query));
      const highlight_str = display.substring(display.toLocaleLowerCase().indexOf(query), display.toLocaleLowerCase().indexOf(query) + query.length)
      const right_str = display.substring(display.toLocaleLowerCase().indexOf(query) + query.length);
      return [
        `<span>` + left_str + `</span>`,
        `<span>` + highlight_str + `</span>`,
        `<span>` + right_str + `</span>`,
      ]
    }
    else
      return [
        `<span>` + display + `</span>`,
        ``,
        ``,
      ]
  }
}
