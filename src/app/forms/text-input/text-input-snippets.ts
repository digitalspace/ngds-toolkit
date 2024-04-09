export const snippets = {
  basicText: {
    html: `
    <ngds-text-input
      [control]="form?.controls?.['basicText']"
      [label]="'My input label'"
      [subLabel]="'My input sub-label'"
      [placeholder]="'My placeholder'">
    </ngds-text-input>

    <!-- [control] is the only mandatory attribute. -->`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-text-input'
      export class BasicTextInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            basicText: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  resetInput: {
    html: `
    <ngds-text-input
      [control]="form?.controls?.['resetInput']"
      [resetButton]="true">
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'reset-input'
      export class ResetInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            resetInput: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  initialDefault: {
    html: `
    <ngds-text-input
      [control]="form?.controls?.['initialDefault']"
      [resetButton]="true">
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'initial-default-input'
      export class initialDefaultInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            initialDefault: new UntypedFormControl(
              'My default value' { nonNullable: true }
            ),
          })
        }
      }
    })`
  },
  disabledInput: {
    html: `
    <ngds-text-input
      [control]="form?.controls?.['disabledInput']"
      [resetButton]="true"
      [disabled]="isDisabled">
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'disabled-input'
      export class DisabledInput implements OnInit {
        public form;
        public isDisabled: boolean = true // or false;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            disabledInput: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  multilineInput: {
    html: `
    <ngds-text-input
      [label]="'With showCharacterCount'"
      [control]="form?.controls?.['multilineInput']"
      [resetButton]="true"
      [multiline]="true"
      [showCharacterCount]="true">
    </ngds-text-input>

    <ngds-text-input
      [label]="'With maxLength validator'"
      [subLabel]="'maxLength is 20'"
      [control]="form?.controls?.['multilineMaxInput']"
      [resetButton]="true"
      [multiline]="true"
      [showCharacterCount]="true">
    </ngds-text-input>

    <ngds-text-input
      [label]="'With minLength validator'"
      [subLabel]="'minLength is 10'"
      [control]="form?.controls?.['multilineMinInput']"
      [resetButton]="true"
      [multiline]="true"
      [showCharacterCount]="true">
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

    @Component({
      selector: 'multiline-input'
      export class MultilineInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            multilineInput: new UntypedFormControl(null),
            multilineMaxInput: new UntypedFormControl(null, Validators.maxLength(20)),
            multilineMaxInput: new UntypedFormControl(null, Validators.minLength(10)),
          })
        }
      }
    })`
  },
  loadingInput: {
    html: `
    <ngds-text-input
      [control]="form?.controls?.['loadingInput']"
      [resetButton]="true"
      [loadWhile]="isLoading">
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'loading-input'
      export class LoadingInput implements OnInit {
        public form;
        public isLoading: boolean = true // or false;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            loadingInput: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  requiredInput: {
    html: `
    <ngds-text-input
      [control]="form?.controls?.['requiredInput']">
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

    @Component({
      selector: 'required-input'
      export class RequiredInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            requiredInput: new UntypedFormControl(null, Validators.required),
          })
        }
      }
    })`
  },
  hideInvalidState: {
    html: `
    <ngds-text-input
      [control]="form?.controls?.['hideInvalidState']" [hideInvalidState]="true">
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

    @Component({
      selector: 'required-input'
      export class HideInvalidState implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            hideInvalidState: new UntypedFormControl(null, Validators.required),
          })
        }
      }
    })`
  },
  customValidator: {
    html: `
    <ngds-text-input
      [control]="form?.controls?.['customValidator']" [invalidConfig]="invalidConfig">
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

    @Component({
      selector: 'custom-validator-input'
      export class customValidatorInput implements OnInit {
        public form;
        public invalidConfig = {
          showMessages: true,
          messages: {
            required: 'This is a custom error message. This field is empty so the field is invalid.'
          }
        }

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            customValidator: new UntypedFormControl(null, [Validators.required, this.customValidator()]),
          })
        }

        customValidator(): ValidatorFn {
          return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (value === 'invalid') {
              return { customValidator: 'The value of this input cannot be "invalid"' }
            }
            return null;
          }
        }
      }
    })`
  },
  justify: {
    html: `
    <ngds-text-input
      [control]="form?.controls?.['justify']"
      [justify]="'end'">
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

    @Component({
      selector: 'justified-text-input'
      export class JustifiedTextInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            justify: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  inline: {
    html: `
    <ngds-text-input [control]="form?.controls?.['inline']" [resetButton]="true">
      <button ngdsInputPrepend class="btn btn-primary">Button 1</button>
      <button ngdsInputPrepend class="btn btn-success">Button 2</button>
      <button ngdsInputAppend class="btn btn-warning">Button 3</button>
      <button ngdsInputAppend class="btn btn-danger">Button 4</button>
    </ngds-text-input>

    <ngds-text-input [control]="form?.controls?.['inline']" [resetButton]="true">
      <i ngdsInputPrepend class="mx-2 align-items-center bi bi-info-circle"></i>
      <i ngdsInputPrepend class="mx-2 bi bi-image-fill"></i>
      <i ngdsInputAppend class="mx-2 bi bi-house"></i>
      <i ngdsInputAppend class="mx-2 bi bi-link-45deg"></i>
    </ngds-text-input>

    <ngds-text-input [control]="form?.controls?.['inline']" [resetButton]="true">
      <div ngdsInputPrepend class="custom-prepend p-2 h-100 rounded-start">Prepended text with custom class</div>
      <div ngdsInputAppend class="custom-append p-2 h-100 rounded-end">Appended text with custom class</div>
    </ngds-text-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'inline-input'
      export class InlineInput implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            inline: new UntypedFormControl(null),
          })
        }
      }
    })`,
    css: `
    .custom-prepend {
      background-color: aquamarine;
      color: purple;
    }

    .custom-append {
      background-color: purple;
      color: aquamarine;
    }
    `
  }
}