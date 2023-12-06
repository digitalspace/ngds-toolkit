import { Component, Input } from '@angular/core';
import { NgdsInput } from '../ngds-input.component';

@Component({
  selector: 'ngds-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsToggleInput extends NgdsInput {
  // If true, render the toggle as a switch instead of a checkbox. Default false.
  @Input() switch: boolean = false;

  // If true, clicking on the prepended content toggles the switch. Default false.
  @Input() clickablePrepend: boolean = false;

  // If true, clicking on the prepended content toggles the switch. Default false.
  @Input() clickableAppend: boolean = false;

  toggle(t = true) {
    if (t) {
      this.control.value = Boolean(!this.control.value);
      this.control.updateValueAndValidity();
      this.control.markAsTouched();
      this.control.markAsDirty();
    }
  }

}
