import { Component, OnInit, TemplateRef, ViewChildren } from '@angular/core';

import { snippets } from './toggles-snippets';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SidebarService } from 'src/app/home/sidebar/sidebar.service';

@Component({
  selector: 'app-toggles',
  templateUrl: './toggles.component.html',
  styleUrls: ['./toggles.component.scss']
})
export class TogglesComponent implements OnInit {
  public form;
  public fields: any = {};
  public isDisabled = false;
  public isLoading = false;
  public snippets = snippets;

  @ViewChildren('section') entries: TemplateRef<any>;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      basicCheckbox: new UntypedFormControl(false),
      basicSwitch: new UntypedFormControl(false),
      standardLabelToggle: new UntypedFormControl(false),
      disabledToggle: new UntypedFormControl(false),
      inlineToggle: new UntypedFormControl(false),
      toggleValidation: new UntypedFormControl(false, [Validators.requiredTrue]),
      clickablePrependAppend: new UntypedFormControl(false),
    })
  }

  disabledSwitch() {
    this.isDisabled = !this.isDisabled;
  }

  loadingSwitch() {
    this.isLoading = !this.isLoading;
  }

  disableProgrammatically(control) {
    if (this.form.controls[control].enabled) {
      this.form.controls[control].disable();
    } else {
      this.form.controls[control].enable();
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



}
