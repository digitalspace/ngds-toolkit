import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { snippets } from './text-input-snippets'
import { SidebarService } from 'src/app/home/sidebar/sidebar.service';

@Component({
  selector: 'text-input-demos',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, AfterViewInit {
  public form;
  public isDisabled = false;
  public isLoading = false;
  public snippets = snippets;

  @ViewChildren('section') entries: TemplateRef<any>;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      basicText: new UntypedFormControl(null),
      resetInput: new UntypedFormControl(null),
      disabledInput: new UntypedFormControl(null),
      initialDefault: new UntypedFormControl(
        'My default value', { nonNullable: true }
      ),
      loadingInput: new UntypedFormControl(null),
      multilineInput: new UntypedFormControl(null),
      multilineMaxInput: new UntypedFormControl(null, Validators.maxLength(20)),
      multilineMinInput: new UntypedFormControl(null, Validators.minLength(10)),
      requiredInput: new UntypedFormControl(null, Validators.required),
      hideInvalidState: new UntypedFormControl(null, Validators.required),
      customValidator: new UntypedFormControl(null, [this.customValidator()]),
      inline: new UntypedFormControl(null),
    })
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

  disableProgrammatically(control) {
    if (this.form.controls[control].enabled) {
      this.form.controls[control].disable();
    } else {
      this.form.controls[control].enable();
    }
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return { emptyField: 'Field cannot be empty!'};
      }
      if (value === 'invalid') {
        return { customValidator: 'The value of this input cannot be "invalid"' }
      }
      return null;
    }
  }


  disabledSwitch() {
    this.isDisabled = !this.isDisabled;
  }

  loadingSwitch() {
    this.isLoading = !this.isLoading;
  }

  valueChanged(e) {
    console.log('ValueChanged:', e);
  }

  statusChanged(e) {
    console.log('statusChanged:', e);
  }
}