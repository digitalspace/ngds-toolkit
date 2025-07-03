export const snippets = {
  basicTypeahead: {
    html: `
    <ngds-typeahead-input
      [control]="form?.controls?.['basicTypeahead']"
      [selectionListItems]="simpleProvinceList"
      [label]="'My typeahead label'"
      [subLabel]="'My typeahead sub-label'"
      [placeholder]="'My placeholder'">
    </ngds-typeahead-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-typeahead'
      export class BasicTypeahead implements OnInit {
        public form;

        simpleProvinceList = [
          'British Columbia',
          'Alberta',
          'Saskatchewan',
          'Manitoba',
          'Ontario',
          'Quebec',
          'Nova Scotia',
          'Newfoundland and Labrador',
          'New Brunswick',
          'Prince Edward Island',
          'Yukon',
          'Northwest Territories',
          'Nunavut'
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            basicTypeahead: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  displayTypeahead: {
    html: `
    <ngds-typeahead-input
      [control]="form?.controls?.['displayTypeahead']"
      [selectionListItems]="displayProvinceList"
      [placeholder]="'Start typing...'"
      [resetButton]="true">
    </ngds-typeahead-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'display-typeahead'
      export class DisplayTypeahead implements OnInit {
        public form;

        displayProvinceList = [
          {
            value: '0001',
            display: 'British Columbia'
          },
          {
            value: '0002',
            display: 'Alberta'
          },
          {
            value: '0003',
            display: 'Saskatchewan'
          },
          {
            value: '0004',
            display: 'Manitoba'
          },
          {
            value: '0005',
            display: 'Ontario'
          },
          {
            value: '0006',
            display: 'Quebec'
          },
          {
            value: '0007',
            display: 'Nova Scotia'
          },
          {
            value: '0008',
            display: 'Newfoundland and Labrador'
          },
          {
            value: '0009',
            display: 'New Brunswick'
          },
          {
            value: '0010',
            display: 'Prince Edward Island'
          },
          {
            value: '0011',
            display: 'Yukon'
          },
          {
            value: '0012',
            display: 'Northwest Territories'
          },
          {
            value: '0013',
            display: 'Nunavut'
          },
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            displayTypeahead: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  minLength: {
    html: `
    <ngds-typeahead-input
    [control]="form?.controls?.['minLength']"
    [selectionListItems]="displayProvinceList"
    [typeaheadMinLength]="3">
    </ngds-typeahead-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'minlength-typeahead'
      export class MinLengthTypeahead implements OnInit {
        public form;

        displayProvinceList = [
          {
            value: '0001',
            display: 'British Columbia'
          },
          {
            value: '0002',
            display: 'Alberta'
          },
          {
            value: '0003',
            display: 'Saskatchewan'
          },
          {
            value: '0004',
            display: 'Manitoba'
          },
          {
            value: '0005',
            display: 'Ontario'
          },
          {
            value: '0006',
            display: 'Quebec'
          },
          {
            value: '0007',
            display: 'Nova Scotia'
          },
          {
            value: '0008',
            display: 'Newfoundland and Labrador'
          },
          {
            value: '0009',
            display: 'New Brunswick'
          },
          {
            value: '0010',
            display: 'Prince Edward Island'
          },
          {
            value: '0011',
            display: 'Yukon'
          },
          {
            value: '0012',
            display: 'Northwest Territories'
          },
          {
            value: '0013',
            display: 'Nunavut'
          },
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            minLength: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  programmaticTypeahead: {
    html: `
    <ngds-typeahead-input
      [control]="form?.controls?.['programmaticTypeahead']"
      [selectionListItems]="displayProvinceList">
    </ngds-typeahead-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'programmatic-typeahead'
      export class ProgrammaticTypeahead implements OnInit {
        public form;

        displayProvinceList = [
          {
            value: '0001',
            display: 'British Columbia'
          },
          {
            value: '0002',
            display: 'Alberta'
          },
          {
            value: '0003',
            display: 'Saskatchewan'
          },
          {
            value: '0004',
            display: 'Manitoba'
          },
          {
            value: '0005',
            display: 'Ontario'
          },
          {
            value: '0006',
            display: 'Quebec'
          },
          {
            value: '0007',
            display: 'Nova Scotia'
          },
          {
            value: '0008',
            display: 'Newfoundland and Labrador'
          },
          {
            value: '0009',
            display: 'New Brunswick'
          },
          {
            value: '0010',
            display: 'Prince Edward Island'
          },
          {
            value: '0011',
            display: 'Yukon'
          },
          {
            value: '0012',
            display: 'Northwest Territories'
          },
          {
            value: '0013',
            display: 'Nunavut'
          },
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            programmaticTypeahead: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  disableTypeahead: {
    html: `
    <ngds-typeahead-input
      [control]="form?.controls?.['disableTypeahead']"
      [selectionListItems]="displayProvinceList"
      [disabled]="isDisabled"
      [loadWhile]="isLoading"
      [placeholder]="'Start typing...'"
      [resetButton]="true">
    </ngds-typeahead-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'disable-typeahead'
      export class DisableTypeahead implements OnInit {
        public form;

        displayProvinceList = [
          {
            value: '0001',
            display: 'British Columbia'
          },
          {
            value: '0002',
            display: 'Alberta'
          },
          {
            value: '0003',
            display: 'Saskatchewan'
          },
          {
            value: '0004',
            display: 'Manitoba'
          },
          {
            value: '0005',
            display: 'Ontario'
          },
          {
            value: '0006',
            display: 'Quebec'
          },
          {
            value: '0007',
            display: 'Nova Scotia'
          },
          {
            value: '0008',
            display: 'Newfoundland and Labrador'
          },
          {
            value: '0009',
            display: 'New Brunswick'
          },
          {
            value: '0010',
            display: 'Prince Edward Island'
          },
          {
            value: '0011',
            display: 'Yukon'
          },
          {
            value: '0012',
            display: 'Northwest Territories'
          },
          {
            value: '0013',
            display: 'Nunavut'
          },
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            displayTypeahead: new UntypedFormControl(null),
          })
        }
      }
    })`
  },
  customTemplateTypeahead: {
    html: `
    <ngds-typeahead-input
      [control]="form?.controls?.['customTemplateTypeahead']"
      [selectionListItems]="displayProvinceList"
      [placeholder]="'Start typing...'"
      [resetButton]="true"
      [selectionListTemplate]="customTemplate">
    </ngds-typeahead-input>

    <ng-template #customTemplate let-matches="matches" let-query="query" let-typeaheadTemplateMethods>
      <ul class="custom-list-group">
        <li class="custom-list-group-item" *ngFor="let match of matches"
          [class.active]="typeaheadTemplateMethods.isActive(match)"
          (click)="typeaheadTemplateMethods.selectMatch(match, $event)"
          (mouseenter)="typeaheadTemplateMethods.selectActive(match)">
          <!-- Before highlight -->
          <span class="custom-no-highlight" [innerHtml]="getHighlightedMatch(match, query)[0]"></span>
          <!-- Highlight -->
          <span class="custom-highlight" [innerHtml]="getHighlightedMatch(match, query)[1]"></span>
          <!-- After highlight -->
          <span class="custom-no-highlight" [innerHtml]="getHighlightedMatch(match, query)[2]"></span>
        </li>
      </ul>
    </ng-template>`,
    ts: `
    import { Component, OnInit, ViewChild} from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'custom-template-typeahead'
      export class CustomTemplateTypeahead implements OnInit {
        public form;

        @ViewChild('customTemplate') customTemplate: TemplateRef<any>;

        displayProvinceList = [
          {
            value: '0001',
            display: 'British Columbia'
          },
          {
            value: '0002',
            display: 'Alberta'
          },
          {
            value: '0003',
            display: 'Saskatchewan'
          },
          {
            value: '0004',
            display: 'Manitoba'
          },
          {
            value: '0005',
            display: 'Ontario'
          },
          {
            value: '0006',
            display: 'Quebec'
          },
          {
            value: '0007',
            display: 'Nova Scotia'
          },
          {
            value: '0008',
            display: 'Newfoundland and Labrador'
          },
          {
            value: '0009',
            display: 'New Brunswick'
          },
          {
            value: '0010',
            display: 'Prince Edward Island'
          },
          {
            value: '0011',
            display: 'Yukon'
          },
          {
            value: '0012',
            display: 'Northwest Territories'
          },
          {
            value: '0013',
            display: 'Nunavut'
          },
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            customTemplateTypeahead: new UntypedFormControl(null),
          })
        }

        getHighlightedMatch(item, query) {
          query = query.join(' ');
          let display = item.value;
          if (display.toLocaleLowerCase().indexOf(query) > -1) {
            const left_str = display.substring(0, display.toLocaleLowerCase().indexOf(query));
            const highlight_str = display.substring(display.toLocaleLowerCase().indexOf(query), display.toLocaleLowerCase().indexOf(query) + query.length)
            const right_str = display.substring(display.toLocaleLowerCase().indexOf(query) + query.length);
            return [
              '<span>' + left_str + '</span>',
              '<span>' + highlight_str + '</span>',
              '<span>' + right_str + '</span>',
            ]
          }
          else
            return [
              '<span>' + display + '</span>',
              '',
              '',
            ]
        }
      }
    })`,
    css: `
    .custom-list-group {
      display: flex;
      flex-direction: column;
      width: 300px;
      padding-left: 0;
      max-height: 200px;
      margin: 0;
      list-style: none;
      overflow-y: scroll;
      background-color: aquamarine;
    }

    .custom-list-group-item {
      padding: 0.5rem;
      background-color: purple;
      border: 1px solid lightgrey;
      border-radius: 5px;
      margin: 0.5rem;

      &:hover {
        background-color: rgb(2, 83, 56);
      }
    }

    .custom-highlight {
      font-weight: bold;
      color: goldenrod;
    }

    .custom-no-highlight {
      color: skyblue;
    }
    `
  },
  multiselectTypeahead: {
    html: `
    <ngds-typeahead-input
      [control]="form?.controls?.['customTemplateTypeahead']"
      [selectionListItems]="displayProvinceList"
      [placeholder]="'Start typing...'"
      [resetButton]="true"
      [selectionListTemplate]="customTemplate">
    </ngds-typeahead-input>

    <ng-template #customTemplate let-matches="matches" let-query="query" let-typeaheadTemplateMethods>
      <ul class="custom-list-group">
        <li class="custom-list-group-item" *ngFor="let match of matches"
          [class.active]="typeaheadTemplateMethods.isActive(match)"
          (click)="typeaheadTemplateMethods.selectMatch(match, $event)"
          (mouseenter)="typeaheadTemplateMethods.selectActive(match)">
          <!-- Before highlight -->
          <span class="custom-no-highlight" [innerHtml]="getHighlightedMatch(match, query)[0]"></span>
          <!-- Highlight -->
          <span class="custom-highlight" [innerHtml]="getHighlightedMatch(match, query)[1]"></span>
          <!-- After highlight -->
          <span class="custom-no-highlight" [innerHtml]="getHighlightedMatch(match, query)[2]"></span>
        </li>
      </ul>
    </ng-template>`,
    ts: `
    import { Component, OnInit, ViewChild} from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'custom-template-typeahead'
      export class CustomTemplateTypeahead implements OnInit {
        public form;

        @ViewChild('customTemplate') customTemplate: TemplateRef<any>;

        displayProvinceList = [
          {
            value: '0001',
            display: 'British Columbia'
          },
          {
            value: '0002',
            display: 'Alberta'
          },
          {
            value: '0003',
            display: 'Saskatchewan'
          },
          {
            value: '0004',
            display: 'Manitoba'
          },
          {
            value: '0005',
            display: 'Ontario'
          },
          {
            value: '0006',
            display: 'Quebec'
          },
          {
            value: '0007',
            display: 'Nova Scotia'
          },
          {
            value: '0008',
            display: 'Newfoundland and Labrador'
          },
          {
            value: '0009',
            display: 'New Brunswick'
          },
          {
            value: '0010',
            display: 'Prince Edward Island'
          },
          {
            value: '0011',
            display: 'Yukon'
          },
          {
            value: '0012',
            display: 'Northwest Territories'
          },
          {
            value: '0013',
            display: 'Nunavut'
          },
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            customTemplateTypeahead: new UntypedFormControl(null),
          })
        }

        getHighlightedMatch(item, query) {
          query = query.join(' ');
          let display = item.value;
          if (display.toLocaleLowerCase().indexOf(query) > -1) {
            const left_str = display.substring(0, display.toLocaleLowerCase().indexOf(query));
            const highlight_str = display.substring(display.toLocaleLowerCase().indexOf(query), display.toLocaleLowerCase().indexOf(query) + query.length)
            const right_str = display.substring(display.toLocaleLowerCase().indexOf(query) + query.length);
            return [
              '<span>' + left_str + '</span>',
              '<span>' + highlight_str + '</span>',
              '<span>' + right_str + '</span>',
            ]
          }
          else
            return [
              '<span>' + display + '</span>',
              '',
              '',
            ]
        }
      }
    })`
  },
  invalidTypeahead: {
    html: `
    <ngds-typeahead-input
      [control]="form?.controls?.['invalidTypeahead']"
      [selectionListItems]="displayProvinceList"
      [placeholder]="'Start typing...'"
      [resetButton]="true">
    </ngds-typeahead-input>`,
    ts: `
    import { Component, OnInit, ViewChild, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'invalid-typeahead'
      export class InvalidTypeahead implements OnInit {
        public form;

        displayProvinceList = [
          {
            value: '0001',
            display: 'British Columbia'
          },
          {
            value: '0002',
            display: 'Alberta'
          },
          {
            value: '0003',
            display: 'Saskatchewan'
          },
          {
            value: '0004',
            display: 'Manitoba'
          },
          {
            value: '0005',
            display: 'Ontario'
          },
          {
            value: '0006',
            display: 'Quebec'
          },
          {
            value: '0007',
            display: 'Nova Scotia'
          },
          {
            value: '0008',
            display: 'Newfoundland and Labrador'
          },
          {
            value: '0009',
            display: 'New Brunswick'
          },
          {
            value: '0010',
            display: 'Prince Edward Island'
          },
          {
            value: '0011',
            display: 'Yukon'
          },
          {
            value: '0012',
            display: 'Northwest Territories'
          },
          {
            value: '0013',
            display: 'Nunavut'
          },
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            invalidTypeahead: new UntypedFormControl(null, [this.customValidator]),
          })
        }

        customValidator(): ValidatorFn {
          return (control: AbstractControl): ValidationErrors | null => {
            const value = String(control.value);
            console.log('value:', value);
            if (value === '0011' || value === '0012' || value === '0013') {
              return { customValidator: 'This is not a province.' }
            }
            return null
          }
        }

`
  },
  displaySelectedTypeahead: {
    html: `
    <ngds-typeahead-input
      [control]="form?.controls?.['displaySelectedTypeahead']"
      [selectionListItems]="displayProvinceList"
      [displaySelectionItems]="'false'"
      [placeholder]="'Start typing...'"
      [resetButton]="true">
    </ngds-typeahead-input>`,
    ts: `
    import { Component } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'display-selected-typeahead'
      export class DisplaySelectedTypeahead implements OnInit {
        public form;

        displayProvinceList = [
          {
            value: '0001',
            display: 'British Columbia'
          },
          {
            value: '0002',
            display: 'Alberta'
          },
          {
            value: '0003',
            display: 'Saskatchewan'
          },
          {
            value: '0004',
            display: 'Manitoba'
          },
          {
            value: '0005',
            display: 'Ontario'
          },
          {
            value: '0006',
            display: 'Quebec'
          },
          {
            value: '0007',
            display: 'Nova Scotia'
          },
          {
            value: '0008',
            display: 'Newfoundland and Labrador'
          },
          {
            value: '0009',
            display: 'New Brunswick'
          },
          {
            value: '0010',
            display: 'Prince Edward Island'
          },
          {
            value: '0011',
            display: 'Yukon'
          },
          {
            value: '0012',
            display: 'Northwest Territories'
          },
          {
            value: '0013',
            display: 'Nunavut'
          },
        ]

        ngOnInit(): void {
          this.form = new UntypedFormGroup({
            displaySelectedTypeahead: new UntypedFormControl(null),
          })
        }
`
  }
}