import { Component, Input } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngds-input-header',
  templateUrl: './ngds-input-header.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsInputHeader {
  @Input() control: any; // Angular control - if required asterisk is wanted
  @Input() label: string;
  @Input() subLabel: string;
  @Input() showCharacterCount: boolean = false;
  @Input() normalFont: boolean = false // Don't bold the header label

  // Show red asterisk if input is required.
  isRequired() {
    return this.control?.hasValidator(Validators.required);
  }

  // We cannot programmatically access the min/maxLength of a control without triggering a min/maxLength error first. We don't display the minLength anywhere.
  // This function grabs the control validator (if any) and triggers a maxLength error (max length = 99999),
  // using a fake form control, then returns the maxLength triggered.
  getMaxLength() {
    const err = this.control.validator ? this.control.validator(new UntypedFormControl('.'.repeat(99999))) : null;
    if (err?.maxlength?.requiredLength) {
      return err.maxlength.requiredLength;
    }
    return null;
  }

}
