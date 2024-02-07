import { AfterViewInit, Component, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { SidebarService } from 'src/app/home/sidebar/sidebar.service';
import { snippets } from './number-input-snippets'
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html',
  styleUrls: ['./numbers.component.scss']
})
export class NumbersComponent implements OnInit, AfterViewInit {
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
      basicNumber: new UntypedFormControl(null),
      disabledNumber: new UntypedFormControl(null),
      maxNumber: new UntypedFormControl(null, [Validators.max(25)]),
      minNumber: new UntypedFormControl(null, [Validators.min(25)]),
      customNumberValidator: new UntypedFormControl(null, [this.customValidator()]),
      positiveOnly: new UntypedFormControl(null),
      integer: new UntypedFormControl(null),
      twoDecimalPlaces: new UntypedFormControl(null),
      padDecimals: new UntypedFormControl(null),
      increment: new UntypedFormControl(null),
      increment2: new UntypedFormControl(null),
      asString: new UntypedFormControl(null),
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

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = String(control.value);
      if (value === '40') {
        return { customValidator: `This input cannot be 40.` }
      }
      return null
    }
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


}
