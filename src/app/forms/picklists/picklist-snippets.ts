export const snippets = {
  basicPicklist: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['basicPicklist']"
      [selectionListItems]="basicSelectionItems"
      [label]="'My picklist label'"
      [subLabel]="'My picklist sub-label'" [placeholder]="'My placeholder'">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-picklist'
      export class BasicPicklist implements OnInit {
        public form;

        public basicSelectionItems = ['value 1', 'value 2', 'value 3'];

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            basicPicklist: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  programmaticPicklist: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['programmaticPicklist']"
      [selectionListItems]="basicSelectionItems"
      [placeholder]="'Make a selection'">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'programmatic-picklist'
      export class ProgrammaticPicklist implements OnInit {
        public form;

        public basicSelectionItems = ['value 1', 'value 2', 'value 3'];

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            programmaticPicklist: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  displayPicklist: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['displayPicklist']"
      [selectionListItems]="displaySelectionItems"
      [placeholder]="'Make a selection'">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'display-picklist'
      export class DisplayPicklist implements OnInit {
        public form;

        public displaySelectionItems = [
          {value: 'value 1', display: 'Custom display text for first item'},
          {value: 'value 2', display: 'Another different text for the second item'},
          {value: 'value 3', display: 'A third display for the final item'}
         ];

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            displayPicklist: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  customPicklist: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['customPicklist']"
      [selectionListItems]="customSelectionItems"
      [placeholder]="'Make a selection'"
      [selectionListTemplate]="customOptionTemplate">
    </ngds-picklist-input>

    <ng-template #customOptionTemplate let-data="data">
      <div class="mx-2 p-2 template-example">
        <h5>Custom HTML Option</h5>
        <p>This option contains custom <span class="badge bg-danger">HTML</span> templates that can be used to create complex dropdown options.</p>
        <p>You can reference the data contained in this entry using the <code>data</code> accessor:</p>
        <span>This option will display "<code>{{data?.display || data?.value || data}}</code>" when picked. </span>
        <span *ngIf="data?.display">This option will have a value of "<code>{{data?.value || data}}</code>" when picked. </span>
        <span *ngIf="!data?.display">This option will display the template when picked. </span>
      </div>
    </ng-template>`,
    ts: `
    import { Component, OnInit, ViewChild } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'custom-picklist'
      export class CustomPicklist implements OnInit {
        public form;

        @ViewChild('customOption') customOption: TemplateRef<any>;

        public customSelectionItems = [
          'value 1',
          { value: 'value 2', display: 'Item without template' },
          { value: 'value 3'},
          { value: 'value 4', display: 'Item with custom template and display option'}
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            customPicklist: new UntypedFormControl(null),
          })
        }

      }
    })`,
    css: `
    .template-example {
      border: 1px solid lightgrey;
      border-radius: 5px;
      &:hover {
        background-color: aquamarine;
        cursor: pointer;
      }
    }
    `
  },
  disabledPicklist: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['disabledPicklist']"
      [selectionListItems]="disabledSelectionItems"
      [placeholder]="'Make a selection'"
      [disabled]="isDisabled"
      [loadWhile]="isLoading"
      [resetButton]="true">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'disabled-picklist'
      export class DisabledPicklist implements OnInit {
        public form;
        public isDisabled: boolean = false // or true;
        public isLoading: boolean = false // or true;

        public disabledSelectionItems = ['valid option 1', 'valid option 2', 'valid option 3'];

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            disabledPicklist: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  invalidPicklist: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['invalidPicklist']" [selectionListItems]="invalidSelectionItems"
      [placeholder]="'Make a selection'">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';

    @Component({
      selector: 'invalid-picklist'
      export class InvalidPicklist implements OnInit {
        public form;

        public invalidSelectionItems = ['valid option 1', 'valid option 2', 'invalid option'];

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            invalidPicklist: new UntypedFormControl(null, [this.customValidator]),
          })
        }

        customValidator(): ValidatorFn {
          return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            if (value === 'invalid option') {
              return { customValidator: "You can't pick this option." }
            }
            return null
          }
        }
      }
    })`
  },
  inlinePicklist: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['inlinePicklist']"
      [resetButton]="true"
      [selectionListItems]="inlineSelectionItems">
        <button ngdsInputPrepend class="btn btn-primary">Button 1</button>
        <button ngdsInputPrepend class="btn btn-success">Button 2</button>
        <button ngdsInputAppend class="btn btn-warning">Button 3</button>
        <button ngdsInputAppend class="btn btn-danger">Button 4</button>
    </ngds-picklist-input>

    <ngds-picklist-input
      [control]="form?.controls?.['inlinePicklist']"
      [resetButton]="true"
      [selectionListItems]="inlineSelectionItems">
        <i ngdsInputPrepend class="mx-2 align-items-center bi bi-info-circle"></i>
        <i ngdsInputPrepend class="mx-2 bi bi-image-fill"></i>
        <i ngdsInputAppend class="mx-2 bi bi-house"></i>
        <i ngdsInputAppend class="mx-2 bi bi-link-45deg"></i>
    </ngds-picklist-input>

    <ngds-picklist-input
      [control]="form?.controls?.['inlinePicklist']"
      [resetButton]="true"
      [selectionListItems]="inlineSelectionItems">
        <div ngdsInputPrepend class="custom-prepend p-2 h-100 rounded-start">Prepended text with custom class</div>
        <div ngdsInputAppend class="custom-append p-2 h-100 rounded-end">Appended text with custom class</div>
    </ngds-picklist-input>
  `,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'inline-picklist'
      export class InlinePicklist implements OnInit {
        public form;

        public inlineSelectionItems = ['inline option 1', 'inline option 2', 'inline option 3'];

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            inlinePicklist: new UntypedFormControl(null),
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
  },
  changeSelectList: {
    html: `
    <ngds-picklist-input [control]="form?.controls?.['changeSelectList']" [selectionListItems]="currentChangeSelectList"
    [placeholder]="'Make a selection'">
  </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'change-picklist'
      export class ChangingPicklist implements OnInit {
        public form;

        public changeSelectList1 = ['this option is only in list 1', 'this option is in both lists'];
        public changeSelectList2 = ['this option is only in list 2', 'this option is in both lists'];
        public currentChangeSelectList;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            changeSelectList: new UntypedFormControl(null),
          })

          this.currentChangeSelectList = this.changeSelectList1;
          this.changeTimer(this.changeSelectList1);
          setTimeout(() => {
            this.currentChangeSelectList = this.changeSelectList2;
            this.changeTimer(this.changeSelectList2);
          }, 2500);
        }

        changeTimer(nextSelectList) {
          setInterval(() => {
            this.currentChangeSelectList = nextSelectList;
          }, 5000);
        }
      }
    })`
  },
  autoCloseBehaviour: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['autoCloseBehaviour']"
      [selectionListItems]="basicSelectionItems"
      [autoCloseBehaviour]="'inside"
      [placeholder]="'Make a selection'">
  </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'autoclose-dropdown'
      export class AutoCloseDropdown implements OnInit {
        public form;

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            autoCloseBehaviour: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  displaySelectionItems: {
    html: `
    <ngds-picklist-input>
      [control]="form?.controls?.['displaySelectionItems']"
      [selectionListItems]="basicSelectionItems"
      [displaySelectionItems]="'true'"
      [label]="'True'"
      [placeholder]="'Make a selection'">
    </ngds-picklist-input>

    <ngds-picklist-input>
      [control]="form?.controls?.['displaySelectionItems']"
      [selectionListItems]="basicSelectionItems"
      [displaySelectionItems]="'false'"
      [label]="'False'"
      [placeholder]="'Make a selection'">
    </ngds-picklist-input>

    <ngds-picklist-input>
      [control]="form?.controls?.['displaySelectionItems']"
      [selectionListItems]="basicSelectionItems"
      [displaySelectionItems]="'disabled'"
      [label]="'Disabled'"
      [placeholder]="'Make a selection'">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'display-selection-picklist'
      export class ChangingPicklist implements OnInit {
         public form;

        public basicSelectionItems = ['value 1', 'value 2', 'value 3'];

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            basicPicklist: new UntypedFormControl(null),
          })
        }
      }
    })`
  }
}