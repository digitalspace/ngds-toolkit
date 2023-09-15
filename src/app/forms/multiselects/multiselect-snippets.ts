export const snippets = {
  basicPicklistMulti: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['basicPicklistMulti']"
      [selectionListItems]="displayProvinceList"
      [multiselect]="true"
      [resetButton]="true"
      [selectAllButton]="true"
      [placeholder]="'Select multiple'">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-typeahead-multiselect'
      export class BasicTypeaheadMulti implements OnInit {
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
            basicTypeaheadMulti: new UntypedFormControl([]), // best to make your default an empty array for multiselects
          })
        }
      }
    })`
  },
  programmaticPicklistMulti: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['programmaticPicklistMulti']"
      [selectionListItems]="displayProvinceList"
      [multiselect]="true"
      [resetButton]="true"
      [selectAllButton]="true"
      [placeholder]="'Select multiple'">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'programmatic-picklist-multiselect'
      export class ProgrammaticPicklistMulti implements OnInit {
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
            programmaticPicklistMulti: new UntypedFormControl([]), // best to make your default an empty array for multiselects
          })
        }
      }
    })`
  },
    basicTypeaheadMulti: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['basicTypeaheadMulti']"
      [selectionListItems]="displayProvinceList"
      [multiselect]="true"
      [resetButton]="true"
      [selectAllButton]="true"
      [placeholder]="'Select multiple'">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'basic-typeahead-multiselect'
      export class BasicTypeaheadMulti implements OnInit {
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
            basicTypeaheadMulti: new UntypedFormControl([]), // best to make your default an empty array for multiselects
          })
        }
      }
    })`
  },
  programmaticTypeaheadMulti: {
    html: `
    <ngds-picklist-input
      [control]="form?.controls?.['programmaticTypeaheadMulti']"
      [selectionListItems]="displayProvinceList"
      [multiselect]="true"
      [resetButton]="true"
      [selectAllButton]="true"
      [placeholder]="'Select multiple'">
    </ngds-picklist-input>`,
    ts: `
    import { Component, OnInit } from '@angular/core';
    import { UntypedFormControl, UntypedFormGroup} from '@angular/forms';

    @Component({
      selector: 'programmatic-typeahead-multiselect'
      export class ProgrammaticTypeaheadMulti implements OnInit {
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
            programmaticTypeaheadMulti: new UntypedFormControl([]), // best to make your default an empty array for multiselects
          })
        }
      }
    })`
  }
}