export const snippets = {
  basicDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['basicDatepicker']"
      [label]="'My datepicker label'"
      [subLabel]="'My datepicker sub-label'" [placeholder]="'My placeholder'">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-datepicker'
      export class BasicDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            basicDatepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  programmaticDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['programmaticDatePicker']"
      [resetButton]="true">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'programmatic-datepicker'
      export class ProgrammaticDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            programmaticDatepicker: new UntypedFormControl(DateTime.now().toISODate(), { nonNullable: true }),
          })
        }
      }
    })`
  },
  inlineDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['inlineDatepicker']"
      [resetButton]="true"
      [inline]="true"
    >
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'inline-datepicker'
      export class InlineDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            inlineDatepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  disabledLoadingDatepicker: {
    html: `
    <ngds-datepicker-input
       [control]="form?.controls?.['disabledDatepicker']"
       [resetButton]="true"
       [disabled]="isDisabled"
       [loadWhile]="isLoading"
       [inline]="true">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'disabled-datepicker'
      export class DisabledDatepicker implements OnInit {
        public form;
        public isLoading = false;
        public isDisabled = false;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            disabledDatepicker: new UntypedFormControl(null),
          })
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
    })`
  },
  minDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['minDatePicker']"
      [label]="'MinDate'" 
      [resetButton]="true"
      [minDate]="getToday()">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';
    import { DateTime } from 'luxon';

    @Component({
      selector: 'min-datepicker'
      export class MinimumDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            minDatepicker: new UntypedFormControl(null),
          })
        }
      }

      getToday() {
        return DateTime.now();
      }
    })`
  },
  maxDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['maxDatepicker']"
      [label]="'MaxDate'" 
      [resetButton]="true"
      [maxDate]="getToday()">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';
    import { DateTime } from 'luxon';

    @Component({
      selector: 'max-datepicker'
      export class MaximumDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            maxDatepicker: new UntypedFormControl(null),
          })
        }
      }

      getToday() {
        return DateTime.now();
      }
    })`
  },
  customDisabledDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['customDisabledDatepicker']"
      [resetButton]="true"
      [customDisableDatesCallback]="customDisableDatesCallback">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';
    import { DateTime } from 'luxon';

    @Component({
      selector: 'custom-disabled-datepicker'
      export class CustomDisabledDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            customDisabledDatepicker: new UntypedFormControl(null),
          })
        }

        customDisableDatesCallback(date: DateTime): boolean {
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
      }
    })`
  },
  invalidDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['invalidDatepicker']"
      [resetButton]="true">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
    import { DateTime } from 'luxon';

    @Component({
      selector: 'invalid-datepicker'
      export class InvalidDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            invalidDatepicker: new UntypedFormControl(null, [this.customValidator()]),
          })
        }

        customValidator(): ValidatorFn {
          return (control: AbstractControl): ValidationErrors | null => {
            if (control?.value) {
              const value = DateTime.fromFormat(control?.value, 'yyyy-MM-dd');
              if (value.weekday >= 6) {
                return { customValidator: "Weekends are not allowed" };
              }
            }
            return null;
          }
        }
      }
    })`
  },
  valueFormatDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['valueFormatDatepicker']"
      [label]="'Long Date Format'"
      [resetButton]="true"
      [dateFormat]="'ff'">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'value-format-datepicker'
      export class ValueFormatDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            valueFormatDatepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  rawDateTimeDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['rawDateTimeDatepicker']"
      [label]="'Return Raw DateTime'"
      [resetButton]="true"
      [dateFormat]="null">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';
    import { DateTime } from 'luxon';

    @Component({
      selector: 'raw-datetime-datepicker'
      export class RawDateTimeDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            rawDateTimeDatepicker: new UntypedFormControl( DateTime.now(), { nonNullable: true}),
          })
        }
      }
    })`
  },
  displayFormatDatepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['displayFormatDatepicker']"
      [resetButton]="true"
      [dateDisplayFormat]="customDisplayFormat">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'display-format-datepicker'
      export class DisplayFormatDatepicker implements OnInit {
        public form;
        public customDisplayFormat = "DDDD";

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            displayFormatDatepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  timezoneUTC: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['timezoneUTC']"
      [resetButton]="true"
      [timezone]="'UTC'"
      [dateDisplayFormat]="'X (z)'"
      [dateFormat]="'yyyy-LL-dd, hh:mm:ss'"
      [label]="'UTC'">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'timezone-utc'
      export class TimezoneUTC implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            timezoneUTC: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  timezoneKiritimati: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['timezoneKiritimati']"
      [resetButton]="true"
      [timezone]="'Pacific/Kiritimati'"
      [dateDisplayFormat]="'X (z)'"
      [dateFormat]="'yyyy-LL-dd, hh:mm:ss'"
      [label]="'Pacific/Kiritimati (UTC+14)'">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'timezone-kiritimati'
      export class TimezoneKiritimati implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            timezoneKiritimati: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  timezoneNiue: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['timezoneNiue']"
      [resetButton]="true"
      [timezone]="'Pacific/Niue'"
      [dateDisplayFormat]="'X (z)'"
      [dateFormat]="'yyyy-LL-dd, hh:mm:ss'"
      [label]="'Pacific/Niue (UTC-11)'">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'timezone-niue'
      export class TimezoneNiue implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            timezoneNiue: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  minModeMonth: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['minModeMonth']"
      [resetButton]="true"
      [minMode]="1"
      [dateDisplayFormat]="'LLLL, yyyy'"
      [label]="'Month (minMode 1)'">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'minmode-month-datepicker'
      export class MinModeMonthDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            minModeMonth: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  minModeYear: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['minModeYear']"
      [resetButton]="true"
      [minMode]="2"
      [dateDisplayFormat]="'yyyy'"
      [label]="'Year (minMode 2)'">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'minmode-year-datepicker'
      export class MinModeYearDatepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            minModeYear: new UntypedFormControl(null),
          })
        }
      }
    })`
  }
}