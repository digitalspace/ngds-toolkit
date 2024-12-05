import { AfterViewInit, Component, OnInit, TemplateRef, ViewChildren } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { snippets } from './datepicker-snippets';
import { SidebarService } from 'src/app/home/sidebar/sidebar.service';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-datepickers',
  templateUrl: './datepickers.component.html',
  styleUrls: ['./datepickers.component.scss']
})
export class DatepickersComponent implements OnInit, AfterViewInit {
  public form;
  public fields: any = {};
  public now = new BehaviorSubject(null);
  public snippets = snippets;
  public luxonCode = `yarn add luxon \nyarn add @popperjs/core`;
  public isDisabled = false;
  public isLoading = false;
  public customDisplayFormat = "DDDD"
  public dateFormatCode = `
    const reversableTokenString = 'yyyy-LL-dd';
    const irreversableTokenString = 'X';
    const now = DateTime.now();

    // success example
    const formattedDateTime1 = now.toFormat(reversableTokenString); // expect valid 'YYYY-MM-DD' format
    const parsedDateTime1 = formattedDateTime1.fromFormat(reversableTokenString); // expect valid DateTime

    // failure example
    const formattedDateTime2 = now.toFormat(irreversableTokenString); // expect valid Unix timestamp
    const parsedDateTime2 = formattedDateTime2.fromFormat(irreversableTokenString); // fails => 'Invalid DateTime';
    `;

  @ViewChildren('section') entries: TemplateRef<any>;

  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      basicDatepicker: new UntypedFormControl(null),
      programmaticDatepicker: new UntypedFormControl(DateTime.now().toUTC().toFormat('yyyy-LL-dd'), { nonNullable: true }),
      disabledLoadingDatepicker: new UntypedFormControl(null),
      inlineDatepicker: new UntypedFormControl(null),
      minDatepicker: new UntypedFormControl(null),
      maxDatepicker: new UntypedFormControl(null),
      customDisabledDatepicker: new UntypedFormControl(null),
      invalidDatepicker: new UntypedFormControl(null, [this.customValidator()]),
      valueFormatDatepicker: new UntypedFormControl(null),
      rawDateTimeDatepicker: new UntypedFormControl(DateTime.now(), { nonNullable: true }),
      displayFormatDatepicker: new UntypedFormControl(null),
      hideOnSelectDatepicker: new UntypedFormControl(null),
      timezoneUTC: new UntypedFormControl(null),
      timezoneNiue: new UntypedFormControl(null),
      timezoneKiritimati: new UntypedFormControl(null),
      minModeMonth: new UntypedFormControl(null),
      minModeYear: new UntypedFormControl(null),
      reversableChecker: new UntypedFormControl('yyyy-LL-dd', { nonNullable: true})
    })
    for (const control of Object.keys(this.form.controls)) {
      this.fields[control] = this.form.controls[control];
    }

    setInterval(()=>{
      this.now.next(DateTime.now());
    },1000);
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value) {
        const value = DateTime.fromFormat(control?.value, 'yyyy-LL-dd');
        if (value.weekday >= 6) {
          return { customValidator: "Weekends are not allowed" };
        }
      }
      return null;
    }
  }

  getFormattedNow(){
    return this.getToday().startOf('day').toFormat(this.form.controls['reversableChecker'].value);
  }

  getParsedNow(){
    const formatted = this.getFormattedNow();
    return DateTime.fromFormat(formatted, this.form.controls['reversableChecker'].value, {zone: 'UTC'});
  }

  checkTokenString(){
    if (this.getToday().startOf('day').ts === this.getParsedNow().ts){
      return true;
    }
    return false;
  }

  customDisabledDatesCallback(date: DateTime): boolean {
    // disable weekends (luxon weekdays are 1-indexed starting with Monday)
    if (date.weekday === 6 || date.weekday === 7) {
      return true;
    }
    // disable the 15th of every month
    if (date.day === 15) {
      return true;
    }
    // disable March 26th, 2024 specifically
    if (date.toISODate() === '2024-03-26') {
      return true;
    }
    return false;
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

  getToday() {
    return DateTime.now().setZone('UTC');
  }

  getBrowserTime() {
    return DateTime.now();
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
