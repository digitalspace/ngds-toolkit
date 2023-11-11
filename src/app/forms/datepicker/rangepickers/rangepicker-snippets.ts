export const snippets = {
  basicRangepicker: {
    html: `
    <ngds-datepicker-input
      [control]="form?.controls?.['basicRangepicker']"
      [dateRange]="true"
      [label]="'My rangepicker label'"
      [subLabel]="'My rangepicker sub-label'" [placeholder]="'My placeholder'">
    </ngds-datepicker-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-rangepicker'
      export class BasicRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            basicRangepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  programmaticRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['programmaticRangepicker']"
      [dateRange]="true"
      [resetButton]="true">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';
    import { DateTime } from 'luxon';

    @Component({
      selector: 'programmatic-rangepicker'
      export class ProgrammaticRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            programmaticRangepicker: new UntypedFormControl([DateTime.now().toFormat('yyyy-LL-dd'), DateTime.now().plus({ days: 1 }).toFormat('yyyy-LL-dd')], { nonNullable: true }),
          })
        }
      }
    })`
  },
  inlineRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['inlineRangepicker']"
      [dateRange]="true"
      [resetButton]="true"
      [inline]="true">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'inline-rangepicker'
      export class InlineRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            inlineRangepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  disabledRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['disabledRangepicker']"
      [dateRange]="true"
      [resetButton]="true"
      [inline]="true"
      [disabled]="isDisabled"
      [loadWhile]="isLoading">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'disabled-rangepicker'
      export class DisabledRangepicker implements OnInit {
        public form;
        public isDisabled;
        public isLoading;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            disabledRangepicker: new UntypedFormControl(null),
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
      }
    })`
  },
  maxRangeRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['maxRangeRangepicker']"
      [dateRange]="true"
      [resetButton]="true"
      [maxRange]="5">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'max-range-rangepicker'
      export class MaxRangeRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            maxRangeRangepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  disabledDatesRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['disabledDatesRangepicker']"
      [label]="'Disabled dates disallowed'"
      [dateRange]="true"
      [resetButton]="true"
      [customDisabledDatesCallback]="customDisabledDatesCallback">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'disabled-dates-rangepicker'
      export class DisabledDatesRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            disabledDatesRangepicker: new UntypedFormControl(null),
          })
        }

        customDisabledDatesCallback(date: DateTime): boolean {
          // Disable the 15th day of each month. 
          if (date.day === 15) {
            return true;
          }
          return false;
        }
      }
    })`
  },
  allowDisabledDatesRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['allowDisabledDatesRangepicker']"
      [label]="'Disabled dates allowed'"
      [dateRange]="true"
      [resetButton]="true"
      [customDisabledDatesCallback]="customDisabledDatesCallback"
      [allowDisabledInRange]="true">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'allow-disabled-dates-rangepicker'
      export class AllowDisabledDatesRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            allowDisabledDatesRangepicker: new UntypedFormControl(null),
          })
        }

        customDisabledDatesCallback(date: DateTime): boolean {
          // Disable the 15th day of each month. 
          if (date.day === 15) {
            return true;
          }
          return false;
        }
      }
    })`
  },
  invalidRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['invalidRangepicker']"
      [dateRange]="true"
      [resetButton]="true">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
    import { DateTime } from 'luxon';

    @Component({
      selector: 'invalid-rangepicker'
      export class InvalidRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            invalidRangepicker: new UntypedFormControl(null, [this.customValidator()]),
          })
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
      }
    })`
  },
  valueFormatRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['valueFormatRangepicker']"
      [dateRange]="true"
      [resetButton]="true"
      [dateFormat]="'DD'"
      [label]="'Formatting control value'">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'value-format-rangepicker'
      export class ValueFormatRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            valueFormatRangepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  displayFormatRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['displayFormatRangepicker']"
      [dateRange]="true"
      [resetButton]="true"
      [dateDisplayFormat]="'DDD'"
      [label]="'Formatting control display'">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'display-format-rangepicker'
      export class DisplayFormatRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            displayFormatRangepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  rangeSeparatorRangepicker: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['rangeSeparatorRangepicker']"
      [dateRange]="true"
      [resetButton]="true"
      [rangeSeparator]="'===>'"
      [label]="'Formatting rangeSeparator'">
    </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'range-separator-rangepicker'
      export class RangeSeparatorRangepicker implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            rangeSeparatorRangepicker: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  timezoneUTC: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['timezoneUTC']"
      [resetButton]="true"
      [timezone]="'UTC'"
      [dateDisplayFormat]="'X (z)'"
      [dateFormat]="'yyyy-LL-dd, TT'"
      [label]="'UTC'"
      [dateRange]="true">
    </ngds-date-input>`,
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
  timezoneNiue: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['timezoneNiue']"
      [resetButton]="true"
      [timezone]="'Pacific/Niue'"
      [dateDisplayFormat]="'X (z)'"
      [dateFormat]="'yyyy-LL-dd, TT'"
      [label]="'Pacific/Niue (UTC-11)'"
      [dateRange]="true">
    </ngds-date-input>`,
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
  timezoneKiritimati: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['timezoneKiritimati']"
      [resetButton]="true"
      [timezone]="'Pacific/Kiritimati'"
      [dateDisplayFormat]="'X (z)'"
      [dateFormat]="'yyyy-LL-dd, TT'"
      [label]="'Pacific/Kiritimati (UTC+14)'"
      [dateRange]="true">
    </ngds-date-input>`,
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
  minModeMonth: {
    html: `
    <ngds-date-input
      [control]="form?.controls?.['minModeMonth']"
      [resetButton]="true"
      [minMode]="1"
      [dateDisplayFormat]="'LLLL, yyyy'"
      [label]="'Month (minMode 1)'"
      [dateRange]="true">
  </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'min-mode-month'
      export class MinModeMonth implements OnInit {
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
    <ngds-date-input
      [control]="form?.controls?.['minModeYear']"
      [resetButton]="true"
      [minMode]="2"
      [dateDisplayFormat]="'yyyy'"
      [label]="'Year (minMode 2)'"
      [dateRange]="true">
  </ngds-date-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'min-mode-year'
      export class MinModeYear implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            minModeYear: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
}