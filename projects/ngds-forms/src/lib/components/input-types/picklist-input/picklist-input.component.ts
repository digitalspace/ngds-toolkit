import { ChangeDetectorRef, Component, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NgdsDropdown } from '../ngds-dropdown.component';

@Component({
  selector: 'ngds-picklist-input',
  templateUrl: './picklist-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsPicklistInput extends NgdsDropdown {

  // Whether the option list is currently stamped in the DOM. Torn down and rebuilt
  // on every repopulate (see rebuildList) so stale rows can never linger.
  protected showList = false;

  constructor(
    private picklistCd: ChangeDetectorRef,
    private picklistRenderer: Renderer2,
  ) {
    super(
      picklistCd,
      picklistRenderer,
    );
    this.dropdownInputType = 'picklist';
    this.subscriptions.add(this.afterDropdownInit.subscribe(() => {
      // Rebuild whenever the option set changes. Mirrors how the typeahead wires
      // this up in its own afterDropdownInitFn.
      this.subscriptions.add(this._displayedSelectionListItems.subscribe(() => {
        this.rebuildList();
      }));
    }));
  }

  // Force Angular to destroy the current option list and stamp a fresh one.
  // The off/on toggle happens synchronously within a single task, so the
  // browser never paints the intermediate empty state (no flicker).
  private rebuildList() {
    if (!this.isDropdownInitialized) {
      return;
    }
    this.showList = false;
    this.picklistCd.detectChanges();
    this.showList = true;
    this.picklistCd.detectChanges();
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

  onValueChange(option, byClick = false) {
    if (option?.disabled) {
      return;
    }
    if (byClick) {
      this.lastChangedBySelect = true;
    }
    this.updateValue(option?.value || option);
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
