import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { NgdsDropdown } from '../ngds-dropdown.component';

@Component({
  selector: 'ngds-picklist-input',
  templateUrl: './picklist-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsPicklistInput extends NgdsDropdown {

  constructor(
    private picklistCd: ChangeDetectorRef,
    private picklistRenderer: Renderer2,
  ) {
    super(
      picklistCd,
      picklistRenderer,
    );
    this.dropdownInputType = 'picklist';
  }

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

  onValueChange(value, byClick = false) {
    if (byClick) {
      this.lastChangedBySelect = true;
    }
    this.updateValue(value);
    this.control.markAsDirty();
    this.control.markAsTouched();
    this.control.updateValueAndValidity();
    this.lastChangedBySelect = false;
  }

  onOpenChange(e) {
    if (e) {
      this.onFocus();
      return;
    }
    this.onBlur();
  }
}
