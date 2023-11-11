import { Component, TemplateRef, ViewChildren } from '@angular/core';
import { snippets } from './rangepicker-snippets';
import { SidebarService } from 'src/app/home/sidebar/sidebar.service';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { DateTime } from 'luxon';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-rangepickers',
  templateUrl: './rangepickers.component.html',
  styleUrls: ['./rangepickers.component.scss']
})
export class RangepickersComponent {
  public form;
  public fields;
  public snippets = snippets
  public luxonCode = `yarn add luxon`;
  public isDisabled = false;
  public isLoading = false;
  public now = new BehaviorSubject(null);

  @ViewChildren('section') entries: TemplateRef<any>;

  constructor(
    private sidebarService: SidebarService,
  ) { }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      basicRangepicker: new UntypedFormControl(null),
      programmaticRangepicker: new UntypedFormControl([DateTime.now().toFormat('yyyy-LL-dd'), DateTime.now().plus({ days: 1 }).toFormat('yyyy-LL-dd')], { nonNullable: true }),
      inlineRangepicker: new UntypedFormControl(null),
      disabledRangepicker: new UntypedFormControl(null),
      maxRangeRangepicker: new UntypedFormControl(null),
      disabledDatesRangepicker: new UntypedFormControl(null),
      allowDisabledDatesRangepicker: new UntypedFormControl(null),
      invalidRangepicker: new UntypedFormControl(null, [this.customValidator()]),
      valueFormatRangepicker: new UntypedFormControl(null),
      displayFormatRangepicker: new UntypedFormControl(null),
      rangeSeparatorRangepicker: new UntypedFormControl(null),
      timezoneUTC: new UntypedFormControl(null),
      timezoneNiue: new UntypedFormControl(null),
      timezoneKiritimati: new UntypedFormControl(null),
      minModeMonth: new UntypedFormControl(null),
      minModeYear: new UntypedFormControl(null),
    })

    setInterval(()=>{
      this.now.next(DateTime.now());
    },1000);
  }

  customValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control?.value) {
        const startDate = DateTime.fromFormat(control?.value[0], 'yyyy-MM-dd').startOf('day');
        const endDate = DateTime.fromFormat(control?.value[1], 'yyyy-MM-dd').startOf('day');
        let currentDate = startDate;
        while (currentDate <= endDate) {
          if (currentDate.day === 15) {
            return { customValidator: 'The selected range cannot include the 15th of any month.' }
          }
          currentDate = currentDate.plus({ days: 1 });
        }
      }
      return null;
    }
  }

  disableProgrammatically(control) {
    if (this.form.controls[control].enabled) {
      this.form.controls[control].disable();
    } else {
      this.form.controls[control].enable();
    }
  }

  customDisabledDatesCallback(date: DateTime): boolean {
    // Disable the 15th day of each month. 
    if (date.day === 15) {
      return true;
    }
    return false;
  }

  disabledSwitch() {
    this.isDisabled = !this.isDisabled;
  }

  loadingSwitch() {
    this.isLoading = !this.isLoading;
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
