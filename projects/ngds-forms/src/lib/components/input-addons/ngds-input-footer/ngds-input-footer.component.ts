import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngds-input-footer',
  templateUrl: './ngds-input-footer.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsInputFooter {
  @Input() control: any;
  @Input() invalid: boolean = false;
  @Input() invalidFieldMsgDefault: string = 'This field requires attention.';
  @Input() invalidFieldMsgRequired: string = 'This field is required.';
  @Input() invalidFieldMsgRequiredTrue: string = 'This field is required to be &quot;true&quot;.';
  @Input() invalidFieldMsgMin: string = '';
  @Input() invalidFieldMsgMax: string = '';
  @Input() invalidFieldMsgMinLength: string = '';
  @Input() invalidFieldMsgMaxLength: string = '';
  @Input() showMsgWhenInvalid: boolean = true;

  constructor() { }

  // If the control is invalid, show the message.
  isShowInvalid() {
    if (this.showMsgWhenInvalid) {
      return this.control?.invalid && this.control?.touched;
    }
    return false;
  }

  getInvalidMsg() {
    // To avoid a crowded UI, only return the first error if there are multiple.
    if (this.control?.errors) {
      let firstErrorKey = Object.keys(this.control.errors)[0];
      switch (firstErrorKey) {
        case 'required':
          return this.invalidFieldMsgRequired;
        case 'requiredTrue':
          return this.invalidFieldMsgRequiredTrue;
        case 'min':
          if (this.invalidFieldMsgMin) {
            return this.invalidFieldMsgMin
          } else { 
            if (this.control.errors[firstErrorKey].min) {
              return `The minimum value of this field can be no less than ${this.control.errors[firstErrorKey].min}.`
            }
          }
          break;
        case 'max':
          if (this.invalidFieldMsgMax) {
            return this.invalidFieldMsgMax
          } else { 
            if (this.control.errors[firstErrorKey].min) {
              return `The maximum value of this field can be no more than ${this.control.errors[firstErrorKey].max}.`
            }
          }
          break;
        case 'minlength':
          if (this.invalidFieldMsgMinLength) {
            return this.invalidFieldMsgMinLength
          } else { 
            if (this.control.errors.minlength.requiredLength) {
              return `This field must be at least ${this.control.errors.minlength.requiredLength} characters in length.`;
            } else {
              return `This field has too few characters.`;
            }
          }
        case 'maxlength':
          if (this.invalidFieldMsgMaxLength) {
            return this.invalidFieldMsgMaxLength;
          } else { 
            if (this.control.errors.maxlength.requiredLength) {
              return `This field must be at most ${this.control.errors.maxlength.requiredLength} characters in length.`;
            }  else {
              return `This field has too many characters.`;
            }
          }
        default:
          if (this.control.errors[firstErrorKey]){
            return this.control.errors[firstErrorKey]
          }
          return this.invalidFieldMsgDefault
      }
    }
    return;
  }

}
