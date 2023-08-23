import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ngds-input-header',
  templateUrl: './ngds-input-header.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsInputHeaderComponent {
  @Input() control: any; // Angular control - if required asterisk is wanted
  @Input() label: string;
  @Input() subLabel: string;

  // TODO: implement tooltip.
  
  // Show red asterisk if input is required.
  isRequired() {
    return this.control?.hasValidator(Validators.required);
  }

}
