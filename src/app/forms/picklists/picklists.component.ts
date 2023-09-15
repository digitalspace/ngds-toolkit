import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs';

import { snippets } from './picklist-snippets';
import { SidebarService } from 'src/app/home/sidebar/sidebar.service';

@Component({
  selector: 'picklists-input-demos',
  templateUrl: './picklists.component.html',
  styleUrls: ['./picklists.component.scss']
})
export class PicklistsComponent implements OnInit, AfterViewInit {

  @ViewChild('customOption') customOption: TemplateRef<any>;
  @ViewChildren('section') entries: TemplateRef<any>;
  @ViewChild('customOptionTemplate') customOptionTemplate: TemplateRef<any>;

  public form;
  public fields: any = {};
  public subscriptions = new Subscription();
  public snippets = snippets;
  public isDisabled: boolean = false;
  public isLoading: boolean = false;
  public isAutoSelect: boolean = false;


  constructor(
    private sidebarService: SidebarService
  ) { }

  public basicSelectionItems = ['value 1', 'value 2', 'value 3'];
  public displaySelectionItems = [
    { value: 'value 1', display: 'Custom display text for first item' },
    { value: 'value 2', display: 'Another different text for the second item' },
    { value: 'value 3', display: 'A third display for the final item' }
  ];
  public customSelectionItems = [
    'value 1',
    { value: 'value 2', display: 'Item without template' },
    { value: 'value 3' },
    { value: 'value 4', display: 'Item with custom template and display option' }
  ]

  public disabledSelectionItems = ['valid option 1', 'valid option 2', 'valid option 3'];
  public invalidSelectionItems = ['valid option 1', 'valid option 2', 'invalid option'];
  public inlineSelectionItems = ['inline option 1', 'inline option 2', 'inline option 3'];
  public changeSelectList1 = ['this option is only in list 1', 'this option is in both lists'];
  public changeSelectList2 = ['this option is only in list 2', 'this option is in both lists'];
  public currentChangeSelectList;

  ngOnInit() {
    this.form = new UntypedFormGroup(
      {
        basicPicklist: new UntypedFormControl(null),
        programmaticPicklist: new UntypedFormControl(null),
        displayPicklist: new UntypedFormControl(null),
        customPicklist: new UntypedFormControl(null),
        disabledPicklist: new UntypedFormControl(null),
        invalidPicklist: new UntypedFormControl(null, [this.customValidator()]),
        inlinePicklist: new UntypedFormControl(null),
        changeSelectList: new UntypedFormControl(null)
      }
    )
    for (const control of Object.keys(this.form.controls)) {
      this.fields[control] = this.form.controls[control];
    }

    this.currentChangeSelectList = this.changeSelectList1;
    this.changeTimer(this.changeSelectList1);
    setTimeout(() => {
      this.currentChangeSelectList = this.changeSelectList2;
      this.changeTimer(this.changeSelectList2);
    }, 2500);
  }

  setValue() {
    this.fields.programmaticPicklist.setValue('value 2')
  }

  ngAfterViewInit(): void {
    let list = [];
    for (const item of this.entries?.['_results']) {
      console.log('item:', item);
      // get title
      let titleIndex = item?.nativeElement?.querySelector('h3');
      list.push({
        href: item?.nativeElement?.id,
        title: titleIndex.innerText
      })
    }
    this.sidebarService.updateList(list);
  }


  changeTimer(nextSelectList) {
    setInterval(() => {
      this.currentChangeSelectList = nextSelectList;
    }, 5000);
  }
  
  disableProgrammatically(control) {
    if (this.form.controls[control].enabled) {
      this.form.controls[control].disable();
    } else {
      this.form.controls[control].enable();
    }
  }

  autoSelectSwitch() {
    this.isAutoSelect = !this.isAutoSelect;
  }


  disabledSwitch() {
    this.isDisabled = !this.isDisabled;
  }

  loadingSwitch() {
    this.isLoading = !this.isLoading;
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value === 'invalid option') {
        return { customValidator: `You can't pick this option.` }
      }
      return null
    }
  }
}
