export const snippets = {
  basicNumber: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['basicNumber']"
      [label]="'My input label'"
      [subLabel]="'My input sub-label'"
      [resetButton]="true"
      [placeholder]="'My placeholder'">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-number-input'
      export class BasicNumberInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            basicNumber: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  programmaticNumber: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['programmaticNumber']"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'programmatic-number-input'
      export class ProgrammaticNumberInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
      programmaticNumber: new UntypedFormControl(123.456, {nonNullable: true}),
          })
        }
      }
    })`
  },
  disabledNumber: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['disabledNumber']"
      [resetButton]="true"
      [loadWhile]="isLoading"
      [disabled]="isDisabled">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'disabled-number-input'
      export class DisabledNumberInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            disabledNumber: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  maxNumber: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['maxNumber']"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

    @Component({
      selector: 'max-number-input'
      export class MaxNumberInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            maxNumber: new UntypedFormControl(null, [Validators.max(25)]),
          })
        }
      }
    })`
  },
  minNumber: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['minNumber']"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

    @Component({
      selector: 'min-number-input'
      export class MinNumberInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            minNumber: new UntypedFormControl(null, [Validators.min(25)]),
          })
        }
      }
    })`
  },
  customNumberValidator: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['customNumberValidator']"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

    @Component({
      selector: 'custom-number-validator'
      export class CustomNumberValidator implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            customNumberValidator: new UntypedFormControl(null, [this.customValidator()]),
          })
        }
      }
      customValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const value = String(control.value);
          if (value === '40') {
            return { customValidator: 'This input cannot be 40.' }
          }
          return null
        }
      }
    })`
  },
  positiveOnly: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['positiveOnly']"
      [allowNegative]="false"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'positive-number-input'
      export class PositiveNumberInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            positiveOnly: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  integer: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['integer']"
      [decimalPlaces]="0"
      [label]="'Integer'"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'integer-number-input'
      export class IntegerNumberInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            integer: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  twoDecimalPlaces: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['twoDecimalPlaces']"
      [decimalPlaces]="2"
      [[label]="'Two Decimal Places'"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'two-decimal-number'
      export class TwoDecimalNumber implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            twoDecimalPlaces: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  padDecimals: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['padDecimals']"
      [padDecimals]="true"
      [decimalPlaces]="3"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'pad-decimals-input'
      export class PadDecimalsInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            padDecimals: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  increment: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['increment']"
      [label]="'Increment by 1'"
      [showIncrements]="true"
      [mouseScrollIncrement]="true"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'increment-number-input'
      export class IncrementNumberInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            increment: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  increment2: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['incrementDecimal']"
      [showIncrements]="true"
      [allowNegative]="false"
      [mouseScrollIncrement]="true"
      [incrementValue]="0.02"
      [decimalPlaces]="2"
      [padDecimals]="true"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'increment-decimal-number'
      export class IncrementDecimalNumber implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            incrementDecimal: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  asString: {
    html: `
    <ngds-number-input
      [control]="form?.controls?.['asString']"
      [decimalPlaces]="2"
      [valueAsString]="true"
      [padDecimals]="true"
      [resetButton]="true">
    </ngds-number-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'value-as-string'
      export class ValueAsStringNumber implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            asString: new UntypedFormControl(null),
          })
        }
      }
    })`
  }
};