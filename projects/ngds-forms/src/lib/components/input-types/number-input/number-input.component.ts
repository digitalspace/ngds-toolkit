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
  @Input() incrementValue: number = 1;
  @Input() mouseScrollIncrement: boolean = false;
  @Input() decimalPlaces: number = -1;
  @Input() allowNegative: boolean = true;
  @Input() padDecimals: boolean = false;
  @Input() allowedKeys: string[] = [
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

  @ViewChild('inputField') inputField: ElementRef;

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

  public value: any;
  public regex;
  public _displayValue = new BehaviorSubject(null);

  get displayValue() {
    return this._displayValue.value;
  }

  set displayValue(value) {
    this._displayValue.next(value);
  }

  ngAfterViewInit(): void {
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
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent) {
    // prevent keys that are disallowed
    if (!this.isAllowableKeyCombo(e)) {
      e.preventDefault();
      return;
    }
    // prevent more than 1 decimal or minus sign not at the start
    if (e.key === '-' && (this.getCaretPos() > 0 || !this.allowNegative)) {
      e.preventDefault();
      return;
    }
    if (e.key === '.' && this.decimalPlaces === 0) {
      e.preventDefault();
      return;
    }
    // Decimal places & enforce regex
    if (this.allowedKeys.indexOf(e.key) > -1 && this.control.value) {
      const value = this.control.value?.toString();
      const pos = this.getCaretPos();
      const next = [value.slice(0, pos), e.key, value.slice(pos)].join('');
      const match = next.match(this.regex);
      if (match[0] !== match['input']) {
        e.preventDefault();
        return;
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    if (this.isDisabled) {
      return;
    }
    e.preventDefault()
    let payload = e.clipboardData.getData('text/plain').match(this.regex)[0];
    this.control.setValue(payload);
  }

  @HostListener('drop', ['$event'])
  onDrop(e: DragEvent) {
    if (this.isDisabled) {
      return;
    }
    e.preventDefault()
    const payload = e.dataTransfer.getData('text/plain').match(this.regex)[0];
    this.control.setValue(payload);
  }

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

  getCaretPos() {
    return Number(this.inputField?.nativeElement?.selectionStart || 0);
  }

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
    newValue = Math.round(newValue*power)/power;
    if (!this.checkRegex(newValue.toString())) {
      return;
    }
    this.control.markAsDirty();
    this.control.markAsTouched();
    this.padAndSetValue(newValue, true);
  }

  checkRegex(value) {
    if (value) {
      const match = value.match(this.regex);
      if (!match || match?.[0] !== match?.['input']) {
        return false;
      }
    }
    return true;
  }

  padAndSetValue(value, alwaysSet = false) {
    if (this.padDecimals && this.decimalPlaces > 0 && value !== null && value?.toString() !== '') {
      this.control.setValue(Number(value).toFixed(this.decimalPlaces));
    }
    else if (alwaysSet) {
      this.control.setValue(value);
    }
  }

  onLoseFocus() {
    this.onBlur();
    if (!this.checkRegex(this.control.value?.toString())) {
      this.control.reset();
    }
    this.padAndSetValue(this.control.value);
  }

}
