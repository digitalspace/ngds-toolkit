import { Component } from '@angular/core';
import { NgdsInput } from '../ngds-input.component';

@Component({
  selector: 'ngds-picklist-input',
  templateUrl: './picklist-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsPicklistInput extends NgdsInput {

  showSelectedTemplate(): boolean {
    if (this.selectionListTemplate) {
      const item = this.getActiveOption();
      if (!item || item.display) {
        return false;
      }
      return true;
    }
    return false;
  }

  showTemplate(): boolean {
    if (this.selectionListTemplate) {
      return true;
    }
    return false;
  }

  onOpenChange(e) {
    if (e) {
      this.onFocus();
      return;
    }
    this.onBlur();
  }
}
