import { Component, Input, OnInit } from '@angular/core';

export interface invalidConfig {
  showMessage?: boolean,
  messages?: {
    default?: string,
    required?: string,
    requiredTrue?: string,
    min?: string,
    max?: string,
    minlength?: string,
    maxlength?: string,
    [key: string]: string
  };
}

@Component({
  selector: 'ngds-input-footer',
  templateUrl: './ngds-input-footer.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsInputFooter implements OnInit {
  @Input() control: any;
  @Input() invalid: boolean = false;
  @Input() config: invalidConfig;

  public defaultConfig: invalidConfig = {
    showMessage: true,
    messages: {
      default: 'This field requires attention.',
      required: 'This field is required.',
      requiredTrue: 'This field is required to be &quot;true&quot;.',
      min: 'The value of this field is too small.',
      max: 'The value of this field is too large.',
      minlength: 'This field is too short.',
      maxlength: 'This field is too long.'
    }
  };

  ngOnInit(): void {
    this.config = { ...this.defaultConfig, ...this.config };
  }

  getInvalidMsg() {
    // To avoid a crowded UI, only return the first error if there are multiple.
    if (this.control?.errors && this.config.showMessage) {
      let firstErrorKey = Object.keys(this.control.errors)[0];
      let message = this.control.errors[firstErrorKey];
      if (!message || typeof message !== 'string') {
        message = this.config.messages[firstErrorKey] || this.config.messages.default;
      }
      return message;
    }
  }

}
