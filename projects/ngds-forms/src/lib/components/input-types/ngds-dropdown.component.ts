import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2, TemplateRef, ViewChild, } from '@angular/core';
import * as bootstrap from 'bootstrap/dist/js/bootstrap.esm.min.js';

import { NgdsInput } from './ngds-input.component';
import { BehaviorSubject, last } from 'rxjs';
import { popper } from '@popperjs/core';

@Directive({
  selector: 'ngds-input',
})
export class NgdsDropdown extends NgdsInput implements AfterViewInit {

  @Input() autoCloseBehaviour: String | 'inside' | 'outside' | 'true' | 'false' = 'inside';

  @Output() onDropdownHide = new EventEmitter<void>();
  @Output() onDropdownShow = new EventEmitter<void>();

  @Output() afterDropdownInit = new EventEmitter<void>();

  // Template for the default dropdown list
  @ViewChild('defaultListTemplate') defaultListTemplate: TemplateRef<any>;
  @ViewChild('typeaheadInput') typeaheadInput: ElementRef;
  // Template for the dropdown menu
  @ViewChild('dropdownMenu') dropdownMenu: ElementRef;
  // Template for the whole dropdown wrapped element
  @ViewChild('dropdownElement') dropdownElement: ElementRef;

  protected dropdownInputType;

  protected bsDropdown: any = null;

  // The status of the dropdown. If true, the dropdown is open. If false, the dropdown is closed.
  protected _isOpen = new BehaviorSubject<boolean>(false);

  get isOpen() {
    return this._isOpen.value;
  }

  // The index of the item that is currently focused in the dropdown. This is used for keyboard navigation.
  protected focusIndex: number = 0;

  // The list of items to display in the dropdown. Will divert from the selectionListItems if the user has typed something in.
  protected refinedListItems: any[] = [];

  // Close the dropdown if the user clicks inside the menu but not on a value (no selection occurs).
  protected keepOpenOnMissedClickInMenu: boolean = false;

  // Override dropdown opening behaviour
  protected preventOpening: boolean = false;

  // Boolear to determine if the dropdown has been initialized. This is used to prevent the dropdown from being opened before it is ready.
  protected isDropdownInitialized: boolean = false;

  // Don't trigger any focus changes when this is true.
  protected isChangingFocus: boolean = false;

  // Last changed by select action or by typing (for typeaheads)
  protected lastChangedBySelect: boolean = false;

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // If the user presses the tab key, move the focus to the next item in the dropdown
    if (this.isOpen && event.key === 'Tab') {
      // if (event.shiftKey) {
      //   this.setFocusIndex(this.focusIndex, -1);
      // } else {
      //   this.setFocusIndex(this.focusIndex, 1);
      // }
    }
    // If the user presses the enter key, select the item that is currently focused
    if (this.isOpen && (event.key === 'Enter')) {
      // event.stopPropagation();
      // event.preventDefault();
      // this.getFocusedItem().dispatchEvent(new Event('click'));
    }
  }

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {
    super();
    // Listen for click events that happen outside of the input. The typeahead text entry should close when the input loses focus, but unfortunately the blur event occurs before any changes are captured, so when selecting from the dropdown, the select is missed if the input closes itself first.
    this.renderer.listen('window', 'mousedown', (e: Event) => {
      this.handleClick(e);
    });
  }

  ngAfterViewInit(): void {
    // Initialize the dropdown
    this.bsDropdown = new bootstrap.Dropdown(this.inputElement.nativeElement, {
      autoClose: this.autoCloseBehaviour,
    });
    this.subscriptions.add(this._isOpen.subscribe((open) => {
      if (open) {
        this.onDropdownShow.emit();
      } else {
        this.onDropdownHide.emit();
      }
    }));
    // On dropdown show completion, adjust the scroll position of the dropdown menu
    this.subscriptions.add(this.dropdownMenu.nativeElement.addEventListener('shown.bs.dropdown', () => {
      setTimeout(() => {
        window.scrollBy(0, 50);
      }, 500);
    }));
    this.subscriptions.add(this.controlDestroyed.subscribe(() => {
      this.closeDropdown();
      this.bsDropdown.dispose();
    }));
    this.afterDropdownInit.emit();
    this.isDropdownInitialized = true;
    this.cd.detectChanges();
  }

  override onControlValueChanges(value: any): void {
    if (this.doesDropdownCloseOnValueChange()) {
      if (this.dropdownInputType === 'typeahead') {
        this.closeDropdown();
      } else {
        this.dropdownBlur();
      }
    }
    this.updateDropdownPosition();
  }

  setFocusIndex(index, increase = 0) {
    // get current index size
    let size = this.refinedListItems.length;
    // if size is 0, return
    if (size === 0) {
      this.focusIndex = 0;
      return;
    }
    let newIndex = index;
    if (increase !== 0) {
      // We want to increase the index by 1 or decrease it by 1
      newIndex = this.focusIndex + increase;
    }
    // If the new index is greater than the size of the list, set it to the list size - 1
    if (newIndex >= size) {
      newIndex = size - 1;
    }
    // If the new index is less than 0, set it to 0
    if (newIndex < 0) {
      newIndex = 0;
    }
    // Set the focus index to the new index
    this.focusIndex = newIndex;

    if (this.dropdownMenu && this.isOpen) {
      let scrollPos = this.dropdownMenu.nativeElement.scrollTop;
      let clientHeight = this.dropdownMenu.nativeElement.clientHeight;
      let focusItemOffsetTop = this.dropdownMenu.nativeElement.children[this.focusIndex].offsetTop;
      let focusItemHeight = this.dropdownMenu.nativeElement.children[this.focusIndex].clientHeight;
      if (focusItemOffsetTop > scrollPos + 0.9 * clientHeight) {
        this.dropdownMenu.nativeElement.scrollTop = focusItemOffsetTop - clientHeight + focusItemHeight;
      } else if (focusItemOffsetTop < scrollPos) {
        this.dropdownMenu.nativeElement.scrollTop = focusItemOffsetTop;
      }
    }
  }

  checkFocusIndex(item) {
    let value = item?.value || item?.display || item;
    let focusValue = this.getFocusedItemValue();
    if (value === focusValue) {
      return true;
    }
    return false;
  }

  dropdownFocus() {
    if (!this.isFocused) {
      this.isChangingFocus = true;
      this.onFocus();
      this.openDropdown();
      this.isChangingFocus = false;
    }
  }

  dropdownBlur() {
    this.isChangingFocus = true;
    this.onBlur();
    this.closeDropdown();
    this.isChangingFocus = false;
  }

  openDropdown() {
    if (!this.isOpen && !this.preventOpening) {
      this._isOpen.next(true);
      this.bsDropdown.show();
      this.updateDropdownPosition();
    }
  }

  closeDropdown() {
    if (this.isOpen) {
      this._isOpen.next(false);
      this.bsDropdown.hide();
    }
  }

  toggleDropdown() {
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  }

  updateDropdownPosition() {
    if (this.isOpen) {
      // Update the dropdown menu position to ensure it is displayed correctly
      // We need to wait for the dropdown to finish opening before we can update the position
      // So we use a timeout to wait for the next tick
      setTimeout(() => {
        this.bsDropdown.update();
      }, 0);
    }
  }

  getFocusedItem() {
    return document.activeElement;
  }

  getFocusedItemValue() {
    let focusedItem = this.getFocusedItem();
    let value = focusedItem.getAttribute('value') || null;
    return value;
  }

  handleOptionClick(item) {
    let menuElements = this.dropdownMenu.nativeElement.querySelectorAll('[role="select"]');
    let match = {};
    for (let i = 0; i < menuElements.length; i++) {
      let element = menuElements[i];
      if (element?.attributes?.value?.value === item || item?.value || item?.display) {
        element.focus();
        match = element;
        break;
      }
    }
  }



  handleClick(event) {
    // If the dropdown is open...
    if (this.isOpen) {
      if (!this.isClickInsideMenu(event)) {
        switch (this.autoCloseBehaviour) {
          case 'inside':
            if (!this.isClickInsideInput(event)) {
              this.dropdownBlur();
            }
            break;
          case 'outside':
            if (!this.isClickInsideInput(event)) {
              this.dropdownBlur();
            }
            break;
          case 'false':
            if (!this.isClickInsideMenu(event)) {
              this.dropdownBlur();
            }
            break;
          case 'true':
          default:
            this.dropdownBlur();
        }
      } else {
        event.stopPropagation();
        event.preventDefault();
      }
    } else {
      // If the dropdown is closed...
      if (this.isClickInsideInput(event)) {
        this.dropdownFocus();
      }
    }
  }

  isClickInsideInput(event) {
    return this.inputElement.nativeElement.contains(event.target);
  }

  isClickInsideMenu(event) {
    return this.dropdownMenu.nativeElement.contains(event.target);
  }


  doesDropdownCloseOnValueChange() {
    if (this.lastChangedBySelect) {
      switch (this.autoCloseBehaviour) {
        case 'false':
        case 'outside':
          return false;
        case 'inside':
        case 'true':
        default:
          return true;
      }
    }
    return false;
  }
}