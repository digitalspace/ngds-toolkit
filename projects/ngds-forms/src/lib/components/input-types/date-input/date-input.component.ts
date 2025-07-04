import { ChangeDetectorRef, Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { DateTime, Duration } from 'luxon';
import { BehaviorSubject } from 'rxjs';
import { ValidationErrors, ValidatorFn } from '@angular/forms';
import { NgdsDropdown } from '../ngds-dropdown.component';

@Component({
  selector: 'ngds-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['../../../../../assets/styles/styles.scss']
})
export class NgdsDateInput extends NgdsDropdown {
  // Whether or not the datepicker will be used to pick a single date or a range of values.
  @Input() dateRange: boolean = false;

  // The luxon token string that will be used to convert between DateTime and control value.
  @Input() dateFormat: string = 'yyyy-MM-dd';

  // The luxon token string that will be used to convert between DateTime and control display.
  // If unset, it will be the same as dateFormat.
  @Input() dateDisplayFormat: string;

  // The IANA string pertaining to the luxon timezone in which all DateTime calculations are performed.
  @Input() timezone: string = 'UTC';

  // A DateTime object, after which all future dates are disabled.
  @Input() maxDate: DateTime = null;

  // A DateTime object, before which all past dates are disabled.
  @Input() minDate: DateTime = null;

  // The minimum level of precision the datepicker/rangepicker will display.
  // 0 = date, 1 = month, 2 = year
  @Input() minMode: number = 0;

  // The maximum allowable length of a selected range. No limit if set to 0.
  @Input() maxRange: number = 0;

  // The minimum allowable length of a selected range. No limit if set to 0.
  @Input() minRange: number = 0;

  // The string used in the input display to separate the start and end display strings of a range.
  @Input() rangeSeparator: string = 'to';

  // Whether or not to display the datepicker/rangepicker inline.
  @Input() inline: boolean = false;

  // Whether or not to allow range selections to include disabled dates.
  @Input() allowDisabledInRange: boolean = false;

  // A function that takes a DateTime as an argument and returns a boolean.
  // If the function returns true, the date associated with the supplied DateTime will be disabled.
  // If the function returns false, the date associated with the supplied DateTime will be available to select.
  @Input() customDisabledDatesCallback: (date: DateTime) => boolean;

  // Whether or not to show just one calendar in the rangepicker
  @Input() hideSecondCalendar: boolean = false;

  // Fixed range to select when picking date. When a start date is selected, the endDate will automatically be set.
  @Input() fixedRangeSize: Duration;

  // Emits when the display changes.
  @Output() displayChange = new EventEmitter;

  protected currentDisplay;
  protected selectedDate = new BehaviorSubject<any>(null);
  protected selectedEndDate = new BehaviorSubject<any>(null);

  constructor(
    private datepickerCd: ChangeDetectorRef,
    private datepickerRenderer: Renderer2,
  ) {
    super(
      datepickerCd,
      datepickerRenderer
    );
    this.dropdownInputType = 'datepicker';
    this.subscriptions.add(this.afterDropdownInit.subscribe(() => {
      this.afterDropdownInitFn();
    }));
  }

  afterDropdownInitFn(): void {
    if (!this.dateDisplayFormat) {
      this.dateDisplayFormat = this.dateFormat;
    }
    // Add control validator that triggers when luxon encounters an 'Invalid DateTime'
    this.control.addValidators([this.invalidDateValidator()]);
    // Subscribe to changes in the control value
    this.subscriptions.add(this.control.valueChanges.subscribe((e) => {
      this.updateSelectedDates(e);
      this.matchDisplayToControl();
    }));
    if (this.control?.value) {
      this.updateSelectedDates(this.control.value);
    }
    this.matchDisplayToControl();
    this.datepickerCd.detectChanges();
  }

  /**
   * Invalidates the control if `luxon` encounters an 'Invalid DateTime' error.
   * @returns ValidationErrors | null
   */
  invalidDateValidator(): ValidatorFn {
    return (): ValidationErrors | null => {
      if (this.currentDisplay === 'Invalid DateTime') {
        return { invalidDateTime: ' ' };
      }
      return null;
    };
  }

  /**
   * Every available date is passed through this function, and is disabled if the function returns true.
   * @param date `luxon` DateTime
   * @returns boolean
   */
  disabledDatesFn(date): boolean {
    if (this.isDisabled) {
      return true;
    }
    const dateISO = date.toISODate();
    if (this.minDate) {
      const minISO = this.minDate?.toISODate();
      switch (this.minMode) {
        case 2:
          if (dateISO.slice(0, 4) < minISO.slice(0, 4)) {
            return true;
          };
          break;
        case 1:
          if (dateISO.slice(0, 7) < minISO.slice(0, 7)) {
            return true;
          };
          break;
        default:
          if (dateISO < minISO) {
            return true;
          };
      }
    }
    if (this.maxDate) {
      const maxISO = this.maxDate?.toISODate();
      switch (this.minMode) {
        case 2:
          if (dateISO.slice(0, 4) > maxISO.slice(0, 4)) {
            return true;
          };
          break;
        case 1:
          if (dateISO.slice(0, 7) > maxISO.slice(0, 7)) {
            return true;
          };
          break;
        default:
          if (dateISO > maxISO) {
            return true;
          };
      }
    }
    if (this.customDisabledDatesCallback && this.customDisabledDatesCallback(date)) {
      return true;
    }
    return false;
  }


  /**
   * Handles when new dates are selected from the calendar elements.
   * @param e `luxon` DateTime
   */
  handleDateChange(e) {
    if (this.disabledDatesFn(e)) {
      return;
    }
    if (this.dateRange) {
      // create array of start/end dates
      if (this.selectedDate.value && !this.selectedEndDate.value) {
        // selecting the end date
        let newDate = e;
        if (this.selectedDate.value > newDate) {
          newDate = this.selectedDate.value;
          this.selectedDate.next(e);
        }
        this.setEndDate(newDate);
      } else {
        // clear the dates and restart
        this.currentDisplay = `${this.convertDateTimeToFormat(e, this.dateDisplayFormat)} ${this.rangeSeparator} ...`;
        this.selectedDate.next(e);
        if (this.fixedRangeSize) {
          // automatically set end date if fixedrangesize
          let end = e.plus(this.fixedRangeSize);
          this.setEndDate(end);
        } else {
          this.selectedEndDate.next(null);
        }
      }
    } else {
      if (this.dateFormat) {
        this.control.setValue(this.convertDateTimeToFormat(e));
      } else {
        this.control.setValue(e);
      }
    }
  }

  setEndDate(dateTime) {
    if (this.dateFormat) {
      this.control.setValue([this.convertDateTimeToFormat(this.selectedDate.value), this.convertDateTimeToFormat(dateTime)]);
    } else {
      this.control.setValue([this.selectedDate.value, dateTime]);
    }
    if (this.hideOnSelect) {
      this.hideCalendar();
    }
  }

  /**
   * Clears any currently selected dates from the calendar.
   */
  handleClearDates() {
    this.selectedDate.next(null);
    this.selectedEndDate.next(null);
  }

  /**
   * Emits when the display changes (on calendar update)
   */
  handleDisplayChange() {
    this.displayChange.emit();
  }

  /**
   * Matches the control display to its value
   */
  matchDisplayToControl() {
    try {
      let date = this.control.value;
      if (this.dateRange) {
        this.currentDisplay = `${this.convertValueToFormat(date[0])} ${this.rangeSeparator} ${this.convertValueToFormat(date[1])}`;
      } else {
        this.currentDisplay = this.convertValueToFormat(date);
      }
      if (this.currentDisplay === 'Invalid DateTime') {
        throw 'Invalid DateTime';
      }
    } catch (err) {
      this.currentDisplay = this.control.value;
    }
  }

  /**
   * When the control value changes, we must update the currently selected date.
   * If the control is a rangepicker, we must make sure the selected dates are in chronological order.
   * @param e control change value
   */
  updateSelectedDates(e) {
    if (this.dateRange) {
      // expect array
      if (!e?.length || e.length < 2) {
        this.selectedDate.next(null);
        this.selectedEndDate.next(null);
      } else {
        if (e[0] > e[1]) {
          // organize smallest to largest
          [e[0], e[1]] = [e[1], e[0]];
        }
        if (this.dateFormat) {
          this.selectedDate.next(DateTime.fromFormat(e[0], this.dateFormat, { zone: this.timezone }));
          this.selectedEndDate.next(DateTime.fromFormat(e[1], this.dateFormat, { zone: this.timezone }));
        } else {
          this.selectedDate.next(e[0]);
          this.selectedEndDate.next(e[1]);
        }
      }
    } else if (e) {
      // expect string
      if (this.dateFormat) {
        this.selectedDate.next(DateTime.fromFormat(e, this.dateFormat, { zone: this.timezone }));
      } else {
        this.selectedDate.next(e);
      }
    } else {
      this.selectedDate.next(null);
    }
  }

  /**
   * Parses a formatted string into a `luxon` DateTime.
   * @param value string to parse into DateTime
   * @param format expected string format
   * @returns `luxon` DateTime
   */
  convertFormatToDateTime(value, format = this.dateFormat) {
    return DateTime.fromFormat(value, format, { zone: this.timezone });
  }

  /**
   * Formats a `luxon` DateTime into a string.
   * @param dt `luxon` DateTime
   * @param format proposed string format
   * @returns string
   */
  convertDateTimeToFormat(dt, format = this.dateFormat) {
    return dt.toFormat(format);
  }

  /**
   * Converts a control value into a display value if dateFormat and dateDisplayFormat are different.
   * @param value string
   * @returns string formatted for display
   */
  convertValueToFormat(value) {
    let dt = value;
    if (this.dateFormat) {
      dt = this.convertFormatToDateTime(value);
    }
    return dt.toFormat(this.dateDisplayFormat);
  }

  /**
   * When the dropdown closes, match the display to the actual control value.
   * We can trigger this reset by just setting the control value to itself.
   */
  onCalendarHide() {
    this.control.markAsTouched();
    this.control.setValue(this.control?.value);
  }

  /**
   * Manually shows the calendar
   */
  showCalendar() {
    this.onFocus();
    this.dropdownMenu.nativeElement.classList.add('show');
  }

  /**
   * Manually hides the calendar.
   */
  hideCalendar() {
    this.onBlur();
    this.control.markAsTouched();
    this.dropdownMenu?.nativeElement?.classList?.remove('show');
  }
};
