import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngds-multiselect-item',
  templateUrl: './multiselect-item.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsMultiselectItem {
  @Input() option: any; // Passed in option of type any | selectionItemSchema.
  @Input() disabled: boolean; // Passed in disabled state.

  @Output() remove = new EventEmitter<any>(); // Emit when remove button pressed.

  // Emit value to remove.
  removeItem(e) {
    e.stopPropagation();
    this.remove.emit(this.option?.value || this.option);
  }

}
