import { Component, Input } from '@angular/core';
import { NgdsInput } from '../ngds-input.component';

@Component({
  selector: 'ngds-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsTextInput extends NgdsInput {
  @Input() multiline: boolean = false;
  @Input() showCharacterCount: boolean = false;
};
