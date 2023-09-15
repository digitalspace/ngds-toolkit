import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { Validators } from '@angular/forms';

import { selectionItemSchema } from '../../form-models';

@Directive({
  selector: 'ngds-input',
})
export class NgdsInput implements OnInit, OnDestroy {

  // INPUTS

  // The Angular FormControl / UntypedFormControl / AbstractControl that the input will bind to.
  @Input() control: any;

  // A label associated with the input.
  @Input() label: string;

  // A sub-label associated with the input.
  @Input() subLabel: string;

  // Input placeholder.
  @Input() placeholder: string;

  // Don't run validation logic while the control is focused. 
  @Input() noValidationIfFocused: boolean = false;

  // Emit control value on change even if the change is null or undefined. 
  @Input() emitValueChangeWhenNull: boolean = false;

  // Emit control status when it is recalculated. This is the default behaviour of the control.statusChanges observable. If you only want the event to emit when the status changes, leave this false.
  @Input() emitStatusWhenRecalculated: boolean = false;

  // Set to true to enable certain input types to allow multiple values as an array. Associated Angular control should be set up to handle array-based values. Current inputs that support multiselect: picklist & typeahead.
  @Input() multiselect: boolean;

  // Display a reset button within the input that calls control.reset() when pressed.
  @Input() resetButton: boolean = false;

  // Display a 'select all' option within the input for certain input types that allow multiselect.
  @Input() selectAllButton: boolean

  // Globally available classes to apply to the input. Provide classes as array of string class names.
  @Input() inputClasses: any[];

  // The list of available options in a picklist or typeahead. Provide options as either a basic array, or an array of type selectionItemSchema for more custom options.
  private _selectionListItems = new BehaviorSubject<any>([]);
  @Input() set selectionListItems(items: any[] | selectionItemSchema[]) {
    if (items) {
      if (this._isInputInitialized.value) {
        this.updateSelectionListItems(items);
      } else {
        let isReady = new Subject();
        this._isInputInitialized.pipe(takeUntil(isReady)).subscribe((ready) => {
          if (ready) {
            this.updateSelectionListItems(items);
            isReady.next(true);
            isReady.complete();
          }
        })
      }
    }
  };

  get selectionListItems() {
    return this._selectionListItems.value;
  }

  // An HTML template to show for each selection list item in the dropdown.
  @Input() selectionListTemplate: TemplateRef<any>;

  // Auto-select the first item in the selection list when the list loads, or when the list changes and no longer contains the currently selected value.
  @Input() autoSelectFirstItem: boolean = false;

  // If true, disables the control.
  @Input() set disabled(value: boolean) {
    if (value) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  // If true, disables the control and shows a loading spinner. 
  @Input() set loadWhile(isLoading: boolean) {
    this.updateDisabledState(isLoading);
    this._loading.next(isLoading);
  }

  // OUTPUTS

  // Emits the new value of the control when it changes.
  @Output() valueChange = new EventEmitter<any>();

  // Emits the new status of the control when it changes.
  @Output() statusChange = new EventEmitter<any>();

  // Emits when the input is focused.
  @Output() focus = new EventEmitter<any>();

  // Emits when the input focus is lost.
  @Output() blur = new EventEmitter<any>();

  // Emits the new selection list when it changes.
  @Output() selectionListUpdated = new EventEmitter<any>();

  // Emits when the input has been initialized. 
  @Output() inputIsInitialized = new EventEmitter<any>();

  // VARS

  // Current disabled state.
  public get isDisabled(): boolean {
    return this.getDisabledState();
  }

  // Current loading state and subject.
  private _loading = new BehaviorSubject<boolean>(false);
  public get isLoading(): boolean {
    return this._loading.value;
  }

  // Current control validity.
  public get isInvalid(): boolean {
    if (this.control.touched && this.control.invalid) {
      return true;
    }
    return false;
  }

  // Current focused state and subject.
  public get isFocused(): boolean {
    return this._isFocused.value;
  }
  private _isFocused = new BehaviorSubject<boolean>(false);

  // Last updated control state, for comparison when state changes.
  private lastControlState;

  // Current input initialized state and subject
  public get isInputInitialized(): boolean {
    return this._isInputInitialized.value;
  }
  private _isInputInitialized = new BehaviorSubject<boolean>(false);

  protected subscriptions = new Subscription();
  protected static idCounter: number = 0;
  protected controlId: number = 0;

  constructor(
  ) {
    // Generate 'unique' id for control so label/inputs/etc can talk to one another.
    // Basic angular controls aren't constructed with a unique identifier.
    // This is only to satisfy ARIA - open to better solutions. 
    this.controlId = NgdsInput.idCounter++;
  }

  ngOnInit(): void {
    // attach unique control id
    this.control['id'] = this.controlId;

    // add subscriptions to emit status and value changes
    this.subscriptions.add(this.control.valueChanges.subscribe((res) => {
      if (this.emitValueChangeWhenNull) {
        // Emit status change only if the value isn't null or undefined
        this.valueChange.emit(res);
      } else {
        if (res !== null && res !== undefined) {
          this.valueChange.emit(res);
        }
      }
    }));
    this.subscriptions.add(this.control.statusChanges.subscribe((res) => {
      if (this.emitStatusWhenRecalculated) {
        // Emit status change only if the status actually changes.
        this.statusChange.emit(res);
      } else {
        if (res !== this.lastControlState) {
          this.statusChange.emit(res);
          this.lastControlState = res;
        }
      }
    }));

    // declare control initialized
    this._isInputInitialized.next(true);
    this.inputIsInitialized.emit(true);
    this._isInputInitialized.complete();
  }

  updateSelectionListItems(items: any[]) {
    // capture the current control value
    const controlValue = this.control?.value;
    this._selectionListItems.next(items);
    this.selectionListUpdated.emit(items);
    // if the new selection list has the same value, keep the current control value
    // else reset the control
    const found = items.find((e) => {
      if (e.value) {
        return e.value === controlValue;
      } else {
        return e === controlValue;
      }
    })
    if (found) {
      this.control?.setValue(controlValue);
    } else {
      if (this.autoSelectFirstItem) {
        this.control?.setValue(this.selectionListItems[0]);
      } else {
        this.control?.reset();
      }
    }
  }
  
  updateDisabledState(state) {
    if (state === true) {
      setTimeout(() => {
        this.control?.disable();
      }, 0);
      return;
    }
    setTimeout(() => {
      this.control?.enable();
    }, 0);
  }

  getDisabledState() {
    if (this.control.disabled ||
      this._loading.value === true ||
      this._isInputInitialized.value === false) {
      return true;
    }
    return false;
  }

  getInputClasses() {
    let classes = {};
    if (this.inputClasses && this.inputClasses.length > 1) {
      for (const inputClass of this.inputClasses) {
        classes[inputClass] = true;
      }
    }
    if (this.isInvalid) {
      classes["is-invalid"] = true;
      classes["border"] = true;
      classes["border-danger"] = true;
    } else {
      classes["border"] = true;
    }
    if (this.isDisabled) {
      classes["disabled-input"] = true;
    } else {
      classes["bg-white"] = true;
    }
    classes = Object.assign(classes, this.inputClasses);
    return classes;
  }

  isRequired() {
    return this.control.hasValidator(Validators.required);
  }

  onFocus() {
    this._isFocused.next(true);
    this.focus.emit();
  }

  onBlur() {
    this.control.markAsTouched();
    this._isFocused.next(false);
    this.blur.emit();
  }

  // For updating the control value during multiselection
  updateValue(value) {
    if (this.multiselect) {
      if (value !== null) {
        if (this.control.value?.length) {
          if (this.control.value.indexOf(value) === -1) {
            this.control.setValue([...this.control.value, value]);
          }
        } else {
          this.control.setValue([value]);
        }
      }
    } else {
      this.control.setValue(value);
    }
  }

  multiselectAll() {
    if (this.multiselect && this.selectionListItems.length > 0) {
      let list = [];
      for (const item of this.selectionListItems) {
        list.push(item?.value || item);
      }
      this.control.setValue(list);
    }
  }

  removeValue(value) {
    if (this.multiselect) {
      let newValue = this.control?.value;
      newValue.splice(newValue.indexOf(value), 1);
      this.control.setValue(newValue);
    }
  }

  // Get active selection option by current control value.
  getActiveOption() {
    return this.selectionListItems?.find((i) => {
      if (i.value) {
        return i.value === this.control.value
      }
      return i === this.control.value
    });
  }

  // Get specific selection option by provided value.
  getOptionByValue(value) {
    return this.selectionListItems?.find((e) => {
      if (e.value) {
        return e.value === value;
      }
      return e === value;
    });
  }

  getDisplayByValue(value) {
    const item = this.getOptionByValue(value);
    return item?.display || item?.value || item;
  }

  getActiveDisplay() {
    return this.getDisplayByValue(this.control.value);
  }

  // unsubscribe from all subscriptions when component is destroyed.
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
