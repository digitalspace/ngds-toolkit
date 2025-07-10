import { AfterViewInit, Component, ElementRef, HostListener, Input, Pipe, ViewChild } from '@angular/core';
import { NgdsInput } from '../ngds-input.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ngds-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsNumberInput extends NgdsInput implements AfterViewInit {
  // Hide increment/decrement arrows
  @Input() showIncrements: boolean = false;
  // Increment size
  @Input() incrementValue: number = 1;
  // Whether or not to allow incrementing with the mouse scroll wheel
  @Input() mouseScrollIncrement: boolean = false;
  // Number of decimal places (-1 for no limit)
  @Input() decimalPlaces: number = -1;
  // Whether or not to allow negative values
  @Input() allowNegative: boolean = true;
  // Whether or not to pad decimal places with zeroes on blur
  @Input() padDecimals: boolean = false;
  // Whether or not to represent the field value as a string
  @Input() valueAsString: boolean = false;

  // Allowed characters
  public allowedKeys: string[] = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "-"
  ];

  // Allowed function keys
  public functionKeyCodes: string[] = [
    "AltLeft",
    "AltRight",
    "AltGraph",
    "ControlLeft",
    "ControlRight",
    "ShiftLeft",
    "ShiftRight",
    "Enter",
    "Tab",
    "Delete",
    "Home",
    "End",
    "Insert",
    "PageDown",
    "PageUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Escape",
    "Backspace"
  ]

  // The regex used to enforce the field display, can change based on Input values
  public regex;
  // Tracks the display of the field
  public _displayValue = new BehaviorSubject(null);
  // Flag to ignore control valueChanges when they are enforced by the input displace
  private isProgrammaticUpdate: boolean = true;

  get displayValue() {
    return this._displayValue.value;
  }

  set displayValue(value) {
    if (!isNaN(value)) {
      // We cannot safely represent all numbers
      if (this.checkNumberRepresentation(value)) {
        let next = String(value).match(this.regex)?.[0];
        if (value === '-') {
          next = '-';
        }
        if (next) {
          this._displayValue.next(next);
        } else {
          this._displayValue.next(null);
        }
      } else {
        return;
      }
    } else {
      this._displayValue.next(null);
    }
    this.matchControlToDisplay();
  }

  ngAfterViewInit(): void {
    // monitor control value changes
    this.subscriptions.add(
      this.control.valueChanges.subscribe((value) => {
        this.matchDisplayToControl();
      })
    )
    // build regex
    const signRegExp = this.allowNegative ? '[+-]?' : '';
    if (this.decimalPlaces < 0) {
      // unlimited decimal places
      this.regex = new RegExp(`${signRegExp}(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*)`);
    }
    else if (this.decimalPlaces > 0) {
      // set decimal places
      this.regex = new RegExp(`${signRegExp}(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d{0,${this.decimalPlaces}})`);
    } else {
      // integer (no decimal places)
      this.regex = new RegExp(`${signRegExp}\\d*`)
    }
    // don't allow increments less than what the decimal places can handle
    this.incrementValue = Math.abs(this.incrementValue);
    this.decimalPlaces = this.decimalPlaces < 0 ? -1 : this.decimalPlaces;
    const minimumIncrement = 1 / Math.pow(10, Math.abs(this.decimalPlaces));
    if (this.incrementValue < minimumIncrement) {
      this.incrementValue = minimumIncrement;
    }
    this.matchDisplayToControl();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // prevent keys that are disallowed
    if (!this.isAllowableKeyCombo(e)) {
      e.preventDefault();
      return;
    }
    // prevent more than 1 decimal or minus sign not at the start
    if (e.key === '-' && (this.getCaretPos().startPos > 0 || !this.allowNegative)) {
      e.preventDefault();
      return;
    }
    if (e.key === '.' && this.decimalPlaces === 0) {
      e.preventDefault();
      return;
    }
    // Decimal places & enforce regex
    if (this.allowedKeys.indexOf(e.key) > -1 && this.displayValue) {
      let value = this.displayValue?.toString();
      const { startPos, endPos } = this.getCaretPos();
      // perform regex
      const next = [value.slice(0, startPos), e.key, value.slice(endPos, value?.length - 1)].join('');
      if (next !== '-' && next !== '.' &&  next !== '-.') {
        if (!this.checkRegex(next) || !this.checkNumberRepresentation(next)) {
          e.preventDefault();
          return;
        }
      }
    }
    this.control.markAsDirty();
  }

  // Check for allowable key combinations
  isAllowableKeyCombo(e) {
    // check copy, cut, paste
    if ((e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) // Cmd+X (Mac)
    ) {
      return true;
    }
    if (this.allowedKeys.indexOf(e.key) > -1 || this.functionKeyCodes.indexOf(e.code) > -1) {
      return true;
    }
    return false;
  }

  // For paste event
  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    if (this.isDisabled) {
      return;
    }
    e.preventDefault();
    let payload = e.clipboardData.getData('text/plain').match(this.regex)[0];
    this.control.setValue(payload);
  }

  // For drag and drop event
  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    if (this.isDisabled) {
      return;
    }
    e.preventDefault()
    const payload = e.dataTransfer.getData('text/plain').match(this.regex)[0];
    this.control.setValue(payload);
  }

  // For mouse wheel event
  @HostListener('mousewheel', ['$event'])
  scroll(e: MouseEvent) {
    if (this.isDisabled) {
      return;
    }
    if (this.mouseScrollIncrement) {
      e.preventDefault()
      if (e['wheelDelta'] > 0) {
        this.increment();
      } else {
        this.increment(true);
      }
    }
  }

  // Check whether or not a (String) value has an identical number representation
  checkNumberRepresentation(value: string, mustBeNumber = false) {
    const num = isNaN(Number(value)) ? null : Number(value);
    // Check safe integers
    if (num && (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER)) {
      return false;
    }
    // Allow single characters that arent digits
    if (value === '-' || value === '.') {
      if (mustBeNumber) {
        return false;
      }
      return true;
    }
    // Check number conversion
    // Apply regex
    if (!this.checkRegex(value)){
      return false;
    }
    // Remove minus sign
    let comp = String(value).replace('-', '');
    // Add leading zero if value begins with decimal
    if (comp.startsWith('.')) {
      comp = '0' + comp;
    }
    if (String(Math.abs(num)) !== comp && !comp?.endsWith('.') && !comp?.endsWith('0')) {
      return false;
    }
    return true;
  }

  // Match the input display to the control value
  matchDisplayToControl() {
    if (this.isProgrammaticUpdate) {
      let next = String(this.control?.value).match(this.regex)?.[0];
      if (this.padDecimals && this.decimalPlaces > 0 && next !== null && next?.toString() !== '') {
        next = Number(next).toFixed(this.decimalPlaces);
      }
      if (!next || isNaN(Number(next))) {
        this.displayValue = null;
      } else {
        this.displayValue = String(next);
      }
    }
    this.isProgrammaticUpdate = true;
  }

  // Match the control value to the display
  matchControlToDisplay() {
    // If value as string, don't do anything fancy
    if (this.valueAsString) {
      this.setControlValue(this.displayValue, true);
      return;
    }
    // Otherwise convert to number before updating
    if (this.displayValue) {
      const next = Number(this.displayValue);
      if (isNaN(next)) {
        this.setControlValue(NaN);
      }
      if (this.control.value !== next) {
        this.setControlValue(next);
      }
    } else {
      this.setControlValue(NaN);
    }
  }

  // Get start and end selection position for checking what the next value would be
  getCaretPos() {
    return {
      startPos: Number(this.inputElement?.nativeElement?.selectionStart || 0),
      endPos: Number(this.inputElement?.nativeElement?.selectionEnd || 0)
    };
  }

  // Increment or decrement the field value
  increment(decrement = false) {
    const value = this.control.value || 0;
    let newValue = Number(value);
    if (!decrement) {
      newValue += this.incrementValue;
    } else {
      newValue -= this.incrementValue;
    }
    // round value (floating point handling)
    const power = Math.pow(10, Math.abs(this.decimalPlaces));
    newValue = Math.round(newValue * power) / power;
    if (!this.checkRegex(newValue.toString())) {
      return;
    }
    this.control.markAsDirty();
    this.control.markAsTouched();
    this.padAndSetDisplay(newValue, true);
  }

  // Check if the regex passes or not
  checkRegex(value) {
    if (value) {
      const match = String(value).match(this.regex);
      if (!match || match?.[0] !== match?.['input']) {
        return false;
      }
    }
    return true;
  }

  // Pad display with zeroes (and set control value if valueAsString)
  padAndSetDisplay(value, alwaysSet = false) {
    if (this.padDecimals && this.decimalPlaces > 0 && value !== null && value?.toString() !== '') {
      this.displayValue = Number(value).toFixed(this.decimalPlaces);
    }
    else if (alwaysSet) {
      this.displayValue = Number(value);
    }
    if (this.valueAsString) {
      this.setControlValue(this.displayValue);
    }
  }

  // Set control value from a change in the display input
  // This puts down the isProgrammaticUpdate flag so control.valueChanges() methods are ignored.
  setControlValue(value, string = false) {
    this.isProgrammaticUpdate = false;
    if (this.valueAsString || string) {
      if (!value) {
        this.control.setValue(null);
      } else {
        this.control.setValue(String(value));
      }
    } else {
      this.control.setValue(isNaN(Number(value)) ? null : Number(value));
    }
  }

  // Fires the padding method on blur
  onLoseFocus() {
    this.onBlur();
    if (!this.checkRegex(this.displayValue?.toString())) {
      this.control.reset();
    }
    this.padAndSetDisplay(this.displayValue);
  }

}
