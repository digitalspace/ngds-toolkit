import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { NgdsDropdown } from '../ngds-dropdown.component';

@Component({
  selector: 'ngds-typeahead-input',
  templateUrl: './typeahead-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsTypeaheadInput extends NgdsDropdown implements AfterViewInit {
  // The minimum length that must be typed before suggestion dropdown appears. If 0, dropdown opens on select.

  @Input() typeaheadMinLength: number = 0;
  // The typeahead options will drop up or drop down unless this is set to false.
  @Input() adaptivePosition: boolean = true;
  // The limit of items to display in the dropdown. If -1, all items are displayed.
  @Input() optionsLimit: number = -1;
  // Controls whether or not to use case sensitive matching in the dropdown.
  @Input() caseSensitiveMatching: boolean = false;
  // The no results text to display when there are no matches.
  @Input() noResultsText: string = 'No matching results';

  // protected bsUtils = new bootstrap;

  // Current value to display in the typeahead input.
  protected currentDisplay;

  // If true, control update follows model change. If false, model update follows control change.
  private editByModel: boolean = false;


  // The list of items to display in the dropdown. This is the complete list of items that are available for selection. It can be converted to lowercase for matching or not.
  private matchList: any[] = [];

  constructor(
    private typeaheadCd: ChangeDetectorRef,
    private typeaheadRenderer: Renderer2,
  ) {
    super(
      typeaheadCd,
      typeaheadRenderer,
    );
    this.dropdownInputType = 'typeahead';
    this.subscriptions.add(this.afterDropdownInit.subscribe(() => {
      this.afterDropdownInitFn();
    }));
  }

  afterDropdownInitFn(): void {
    // // watch control for value changes
    this.subscriptions.add(this.control.valueChanges.subscribe((change) => {
      if (change) {
        if (!this.editByModel) {
          this.matchInputToControl();
        }
      }
    }));
    // // watch selectionlistitems for changes
    this.subscriptions.add(this._selectionListItems.subscribe(() => {
      this.onSelectionListItemsChange();
    }));
    // Watch for changes to focus/blur
    this.subscriptions.add(this._isFocused.subscribe(() => {
      if (this.isFocused) {
        this.onTypeaheadFocus();
      } else if (!this.isChangingFocus) {
        this.onTypeaheadBlur();
      }
    }));
    this.typeaheadChange(null);
    this.detectDisplayDuplicates();
    this.typeaheadCd.detectChanges();
    this.preventOpening = false;
  }

  onSelectionListItemsChange() {
    // update matchlist
    this.matchList = this.selectionListItems.map((item) => {
      const matchItem = {
        value: item?.value || item,
        display: item?.display || item?.value || item,
      };
      let matcher = item?.display || item?.value || item;
      if (!this.caseSensitiveMatching) {
        matcher = matcher.toLowerCase();
      }
      matchItem['matcher'] = matcher;
      return matchItem;
    });
  }

  detectDisplayDuplicates() {
    let flag = false;
    let items = [...this.selectionListItems];
    while (!flag && items.length) {
      const item = items.shift();
      const match = items.find((e) => {
        let eDisplay = e?.display || e?.value || e;
        let itemDisplay = item?.display || item?.value || item;
        return eDisplay === itemDisplay;
      });
      if (match) {
        console.warn(`Two or more options in this typeahead share the same display value, which may cause problems when selecting between them. Ensure all options have unique display values.\nDuplicate: ${JSON.stringify(match)}`);
        return;
      }
    }
  }

  // Fires when item is clicked in the dropdown
  selected(item) {
    this.lastChangedBySelect = true;
    if (this.multiselect) {
      this.typeaheadChange(null, false);
    }
    this.typeaheadChange(item.display, false);
    this.lastChangedBySelect = false;
  }

  // Control was updated programmatically; update the UI model to reflect.
  matchInputToControl() {
    if (this.multiselect) {
      this.typeaheadChange(null, false);
    }
    this.typeaheadChange(this.getDisplayByValue(this.control?.value) || null, false);
  }

  resetClicked() {
    this.preventOpening = true;
    this.resetControl();
    this.matchInputToControl();
    this.preventOpening = false;
  }

  selectAll() {
    this.multiselectAll();
  }

  // User interacted with the UI model; update the control to reflect.
  typeaheadChange(value, close = true) {
    if (!this.isDropdownInitialized) {
      return;
    }
    const inputLength = this.currentDisplay?.length || 0;
    if (inputLength < this.typeaheadMinLength) {
      this.preventOpening = true;
      if (this.isOpen || this.isDisabled) {
        this.dropdownBlur();
      }
    } else {
      this.preventOpening = false;
      if (!this.isOpen && !this.preventOpening) {
        if (!this.isFocused) {
          this.dropdownFocus();
        } else {
          this.openDropdown();
        }
      }
    }
    this.editByModel = true;
    this.currentDisplay = value;
    let isValueDefined = value ?? false;
    let matchingItems = [...this.matchList];
    if (isValueDefined) {
      if (!this.caseSensitiveMatching) {
        value = value.toLowerCase();
      }
      matchingItems = this.matchList.filter((item) => item?.matcher?.includes(value));
    }
    if (matchingItems.length > 0) {
      this.refinedListItems = matchingItems.map((item) => {
        return {
          value: item.value,
          innerHtml: this.getHighlightedMatch(item, value),
          display: item.display
        };
      });
      // focus the first item in the list
      this.setFocusIndex(0);
    } else {
      this.refinedListItems = [];
    }
    // If there is only one item in the list and it matches the input
    if (matchingItems.length === 1 && value === matchingItems[0]?.matcher) {
      // set the value of the control to the value of the first item in the list
      this.updateValue(matchingItems[0].value);
      this.afterTypeaheadChange(value, close);
    } else {
      // If the input is empty
      if (this.control?.value !== null && this.control.value !== undefined) {
        this.updateValue(null);
        this.afterTypeaheadChange(value, close);
      }
    }
    this.editByModel = false;
  }

  afterTypeaheadChange(value, close = false) {
    if (!value) {
      this.currentDisplay = null;
    }
    if (this.doesDropdownCloseOnValueChange() || this.lastChangedBySelect) {
      if (this.control?.value !== null && this.control.value !== undefined) {
        this.dropdownBlur();
      }
    }
  }

  onTypeaheadBlur() {
    this.isChangingFocus = true;
    this.typeaheadInput.nativeElement.dispatchEvent(new Event('blur'));
    this.matchInputToControl();
    this.isChangingFocus = false;
  }

  onTypeaheadFocus(match = true) {
    if (match) {
      if (this.multiselect) {
        this.typeaheadChange(null);
      } else {
        this.typeaheadChange(this.currentDisplay);
      }
    }
  }

  placeholderDisplay() {
    if (this.placeholder && !this.multiselect) {
      return this.placeholder;
    }
    return '';
  }

  // Get the dropdown list template
  getTemplate() {
    if (this.selectionListTemplate) {
      return this.selectionListTemplate;
    }
    return this.defaultListTemplate;
  }

  // Highlight the portion of the option that has been typed in
  getHighlightedMatch(item, query) {
    let display = item.display;
    if (display.toLocaleLowerCase().indexOf(query) > -1) {
      const left_str = display.substring(0, display.toLocaleLowerCase().indexOf(query));
      const highlight_str = display.substring(display.toLocaleLowerCase().indexOf(query), display.toLocaleLowerCase().indexOf(query) + query.length);
      const right_str = display.substring(display.toLocaleLowerCase().indexOf(query) + query.length);
      return '<div>' + left_str + `<strong>` + highlight_str + '</strong>' + right_str + '</div>';
    }
    else
      return '<div>' + display + '</div>';
  }

  setInputValue(value) {
    this.currentDisplay = value;
    this.inputElement.nativeElement.value = value;
  }

  isInputHidden() {
    return !this.isOpen && this.multiselect && this.control?.value?.length > 0;
  }
}
