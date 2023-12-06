export const snippets = {
  basicCheckbox: {
    html: `
    <ngds-toggle-input
      [control]="form?.controls?.['basicCheckbox']"
      [label]="My input label"
      [subLabel]="My input sublabel">
    </ngds-toggle-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-checkbox'
      export class BasicCheckbox implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            basicCheckbox: new UntypedFormControl(false);
          })
        }
      }
    })`
  },
  basicSwitch: {
    html: `
    <ngds-toggle-input
      [control]="form?.controls?.['basicSwitch']"
      [label]="My input label"
      [subLabel]="My input sublabel"
      [switch]="true">
    </ngds-toggle-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-switch'
      export class BasicSwitch implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            basicSwitch: new UntypedFormControl(false);
          })
        }
      }
    })`
  },
  standardLabelToggle: {
    html: `
    <ngds-input-header
      [control]="form?.controls?.['standardLabelToggle']"
      [label]="'My input label'"
      [subLabel]="'My input sublabel'">
    </ngds-input-header>
    <ngds-toggle-input
      [control]="form?.controls?.['standardLabelToggle']">
    </ngds-toggle-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'standard-label-toggle'
      export class StandardLabelToggle implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            standardLabelToggle: new UntypedFormControl(false);
          })
        }
      }
    })`
  },
  disabledToggle: {
    html: `
    <ngds-toggle-input
      [control]="form?.controls?.['disabledToggle']"
      [disabled]="isDisabled"
      [loadWhile]="isLoading">
    </ngds-toggle-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'disabled-toggle'
      export class DisabledToggle implements OnInit {
        public form;
        public isDisabled: boolean = false // or true;
        public isLoading: boolean = false // or true;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            disabledToggle: new UntypedFormControl(false);
          })
        }
      }
    })`
  },
  inlineToggle: {
    html: `
    <ngds-toggle-input
      [control]="form?.controls?.['inlineToggle']">
      <i ngdsInputPrepend class="bi bi-house me-1"></i>
      <div ngdsInputAppend class="ms-1">This checkbox is styled inline.</div>
    </ngds-toggle-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'inline-toggle'
      export class InlineToggle implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            inlineToggle: new UntypedFormControl(false);
          })
        }
      }
    })`
  },
  toggleValidation: {
    html: `
    <ngds-toggle-input
      [control]="form?.controls?.['toggleValidation']">
    </ngds-toggle-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';

    @Component({
      selector: 'toggle-validation'
      export class ToggleValidation implements OnInit {
        public form;
        
        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            toggleValidation: new UntypedFormControl(false, [Validators.requiredTrue])
          })
        }
      }
    })`
  },
  clickablePrependAppend: {
    html: `
    <ngds-toggle-input
      [control]="form?.controls?.['clickablePrepend']">
      <div ngdsInputPrepend class="ms-1 text-muted">Default unclickable prepend</div>
      <div ngdsInputAppend class="ms-1">Default clickable append</div>
    </ngds-toggle-input>

    <ngds-toggle-input
      [control]="form?.controls?.['clickablePrepend']"
      [clickablePrepend]="true"
      [clickableAppend]="false">
      <div ngdsInputPrepend class="me-1">Clickable prepend</div>
      <div ngdsInputAppend class="ms-1 text-muted">Unclickable append</div>
    </ngds-toggle-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'clickable-prepend'
      export class ClickablePrepend implements OnInit {
        public form;
        
        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            clickablePrepend: new UntypedFormControl(false)
          })
        }
      }
    })`
  }
}